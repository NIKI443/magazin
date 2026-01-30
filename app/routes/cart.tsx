import { ProductCartItem } from '~/components/shared/productCartItem'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { useAuthStore } from '~/store/useAuthStore'
import { useProductStore } from '~/store/useProductStore'

export default function Cart() {
	const { carts, deleteALLProductCart } = useProductStore()
	const { authUser } = useAuthStore()

	return (
		<div className='max-w-7xl mx-auto grid grid-cols-4 '>
			<div className='col-span-3 mr-10'>
				{carts.length === 0 ? (
					<h2 className='text-3xl font-semibold text-center text-gray-500'>
						Нет товаров
					</h2>
				) : (
					carts.map(cart => (
						<ProductCartItem key={cart.ID_товара} product={cart} />
					))
				)}
			</div>
			<div>
				<h2 className='py-2  text-center text-3xl rounded-t-lg font-semibold bg-neutral-100'>
					ИТОГ
				</h2>
				<div className='p-2.5 pt-5 grid gap-3 border-2 border-t-transparent rounded-b-lg text-center'>
					{carts.map(cart => (
						<p key={cart.ID_товара} className='ml-6 text-left'>
							---{cart.Название}
						</p>
					))}
					<div>
						<p className='text-xl'>
							Количество товаров:{' '}
							{carts
								.reduce((total, cart) => total + cart.Количество, 0)
								.toFixed(0)}
						</p>
						<p className='text-xl'>
							Общая стоимость:{' '}
							{carts
								.reduce((total, cart) => total + cart.Цена * cart.Количество, 0)
								.toFixed(0)}{' '}
							руб.
						</p>
					</div>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button className='w-full text-lg bg-purple-500 hover:bg-purple-400 cursor-pointer'>
								Купить
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent size='sm'>
							<AlertDialogHeader>
								<AlertDialogTitle>Подтверждаете покупку?</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel className='bg-purple-100 hover:bg-purple-50 border-0'>
									Нет
								</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => {
										deleteALLProductCart(authUser.ID_корзины)
									}}
									className='bg-purple-400 hover:bg-purple-300'
								>
									Да
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</div>
	)
}
