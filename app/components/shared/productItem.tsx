import React from 'react'
import { Button } from '~/components/ui/button'
import { useAuthStore } from '~/store/useAuthStore'
import { useProductStore } from '~/store/useProductStore'
import type { Product } from '~/types'

interface Props {
	product: Product
}

export const ProductItem: React.FC<Props> = ({ product }) => {
	const { addProductCart, deleteProductCart } = useProductStore()
	const { authUser } = useAuthStore()
	return (
		<div className='border-2 border-purple-500 rounded-2xl p-3 cursor-pointer hover:shadow-violet-200 hover:shadow-lg'>
			<div className='w-full h-45 mb-3 rounded-2xl flex items-center justify-center overflow-hidden'>
				<img
					src={product.Изображение}
					alt={product.Название}
					className='w-9/10 h-full object-contain'
				/>
			</div>
			<h2 className='line-clamp-1 font-semibold'>{product.Название}</h2>
			<p className='mt-1 text-sm'>{product.Цена} руб.</p>
			{product.isCart ? (
				<div>
					<Button
						onClick={e => {
							deleteProductCart(product.ID_товара_корзины)
							product.isCart = false
						}}
						disabled={!product.ID_товара_корзины}
						className='w-full mt-2 bg-purple-300  hover:bg-purple-200 cursor-pointer'
					>
						{product.ID_товара_корзины ? 'Удалить из корзины' : 'Загрузка...'}
					</Button>
				</div>
			) : (
				<Button
					onClick={e => {
						e.preventDefault()
						addProductCart(product, authUser.ID_корзины)
						product.isCart = true
					}}
					className='w-full mt-2 bg-purple-400  hover:bg-purple-300 cursor-pointer'
				>
					Добавить в корзину
				</Button>
			)}
		</div>
	)
}
