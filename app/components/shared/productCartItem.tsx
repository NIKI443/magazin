import React from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { useProductStore } from '~/store/useProductStore'
import type { Product } from '~/types'
import { DeleteProductDialog } from './deleteProductDialog'

interface Props {
	product: Product
	className?: string
}

export const ProductCartItem: React.FC<Props> = ({ product, className }) => {
	const { deleteProductCart, countProductCart } = useProductStore()
	return (
		<div
			className={cn(
				'border-2 mb-3 flex justify-between border-purple-500 rounded-2xl p-3',
				className,
			)}
		>
			<div className='mx-auto w-2xl text-center'>
				<div className='w-full h-45 mb-3 rounded-2xl flex items-center justify-center overflow-hidden'>
					<img
						src={product.Изображение}
						alt={product.Название}
						className='w-9/10 h-full object-contain'
					/>
				</div>

				<h2 className='font-semibold'>{product.Название}</h2>
				<p className='mt-1 text-sm mb-3'>{product.Описание}</p>
				<p className='mt-1'>{product.Цена} руб.</p>
			</div>
			<div className='flex flex-col justify-between place-items-end'>
				<DeleteProductDialog product={product} />
				<div className='flex items-end gap-2 '>
					<Button
						onClick={() => {
							countProductCart('-', product, product.ID_товара_корзины)
						}}
						variant='outline'
					>
						-
					</Button>
					<div className='pb-1'>{product.Количество}</div>
					<Button
						onClick={() => {
							countProductCart('+', product, product.ID_товара_корзины)
						}}
						variant='outline'
					>
						+
					</Button>
				</div>
			</div>
		</div>
	)
}
