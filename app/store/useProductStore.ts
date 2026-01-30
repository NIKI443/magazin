import { create } from 'zustand'
import axios from '~/lib/axios'
import debounce from '~/lib/debounce'
import type { Category, Product } from '~/types/index'

const debounceMap = new Map<number, ReturnType<typeof debounce>>()
interface ProductState {
	products: Product[]
	carts: Product[]
	filterProducts: Product[]
	categories: Category[]
	isProductFetch: boolean
	isProductFilter: boolean
	isProductDelete: boolean
}
interface ProductActions {
	fetchProducts: (id: number) => Promise<void>
	filterProduct: (value: string) => void
	searchProduct: (searchText: string) => void
	addProductCart: (product: Product, id: number) => Promise<void>
	countProductCart: (
		sign: '+' | '-',
		product: Product,
		id: number | undefined,
	) => Promise<void>
	deleteProductCart: (product: number | undefined) => Promise<void>
	deleteALLProductCart: (product: number | undefined) => Promise<void>
}

export const useProductStore = create<ProductState & ProductActions>()(
	(set, get) => ({
		products: [],
		carts: [],
		filterProducts: [],
		categories: [],
		isProductFetch: false,
		isProductFilter: false,
		isProductDelete: false,
		fetchProducts: async id => {
			try {
				const resProduct = await axios.get('/api/products')
				const resCart = await axios.get(`/api/cart/${id}`)
				const resDataProduct: Product[] = resProduct.data.data
				const resDataCart: Product[] = resCart.data.data
				set({ carts: resDataCart })
				const cartItemIds = new Set(resDataCart.map(item => item.ID_товара))

				// Создаем Map для быстрого доступа к ID товара_корзины
				const cartIdMap = new Map(
					resDataCart.map(item => [item.ID_товара, item.ID_товара_корзины]),
				)

				// Преобразуем продукты с добавлением информации о наличии в корзине
				const enrichedProducts = resDataProduct.map(product => ({
					...product,
					isCart: cartItemIds.has(product.ID_товара),
					ID_товара_корзины: cartIdMap.get(product.ID_товара),
				}))
				console.log(enrichedProducts)
				const filterCategory = Array.from(
					new Set(resDataProduct.map(product => product.Категория)),
				).map(category => ({
					value: category,
					label: category.charAt(0).toUpperCase() + category.slice(1),
				}))
				set({
					products: enrichedProducts,
					categories: filterCategory,
					isProductFetch: true,
				})
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		},
		filterProduct: value => {
			const filterProducts = get().products.filter(
				product => product.Категория == value,
			)
			set({
				filterProducts: filterProducts,
			})
		},
		searchProduct: searchText => {
			const filterProducts = get().products.filter(product => {
				if (product.Название.toLowerCase().includes(searchText.toLowerCase())) {
					return product
				}
			})

			set({
				filterProducts: filterProducts,
				isProductFilter: filterProducts.length == 0,
			})
		},

		addProductCart: async (product, id) => {
			try {
				product.Количество = 1
				const data = { ...product, ID_корзины: id }
				const existingProduct = get().carts.filter(
					p => p.ID_товара !== product.ID_товара,
				)
				set({ carts: [...existingProduct, product] })

				const debouncedUpdate = debounce(async () => {
					try {
						const res = await axios.post(`/api/product`, data)
						const resData = res.data.data
						product.ID_товара_корзины = resData[0].ID_товара_корзины

						set({ carts: [...existingProduct, product] })
					} catch (error) {
						console.error('Ошибка при обновлении на сервере:', error)
					}
				}, 100)

				debouncedUpdate()
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		},
		countProductCart: async (sign, product, id) => {
			try {
				const updatedProduct = {
					...product,
					Количество:
						sign == '+' ? product.Количество + 1 : product.Количество - 1,
				}
				const updatedCarts = get().carts.map(p =>
					p.ID_товара === product.ID_товара ? updatedProduct : p,
				)
				set({ carts: updatedCarts })

				let debouncedUpdate = debounceMap.get(product.ID_товара)

				if (!debouncedUpdate) {
					debouncedUpdate = debounce(
						async (
							productId: number,
							userId: number,
							finalProduct: Product,
						) => {
							try {
								const res = await axios.post(
									`/api/cart/count/${userId}`,
									finalProduct,
								)
							} catch (error) {
								console.error('Ошибка при обновлении на сервере:', error)
							} finally {
								debounceMap.delete(productId)
							}
						},
						500,
					)
					debounceMap.set(product.ID_товара, debouncedUpdate)
				}

				debouncedUpdate(product.ID_товара, id, updatedProduct)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		},

		deleteProductCart: async productId => {
			set({ isProductDelete: true })
			try {
				set({
					carts: get().carts.filter(p => p.ID_товара_корзины !== productId),
				})
				const debouncedUpdate = debounce(async () => {
					try {
						const res = await axios.delete(`/api/cart/${productId}`)
					} catch (error) {
						console.error('Ошибка при обновлении на сервере:', error)
					}
				}, 100)

				debouncedUpdate()
			} catch (error) {
				console.error('Error fetching products:', error)
			} finally {
				set({ isProductDelete: false })
			}
		},
		deleteALLProductCart: async productId => {
			set({ isProductDelete: true })
			try {
				const res = await axios.delete(`/api/cartAll/${productId}`)
				set({ carts: [] })
			} catch (error) {
				console.error('Error fetching products:', error)
			} finally {
				set({ isProductDelete: false })
			}
		},
	}),
)
