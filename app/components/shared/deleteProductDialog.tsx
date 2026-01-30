import { Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog'
import { useProductStore } from '~/store/useProductStore'
import type { Product } from '~/types'

interface Props {
	product: Product
}
export const DeleteProductDialog: React.FC<Props> = ({ product }) => {
	const { deleteProductCart } = useProductStore()

	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button className='w-min py-5 group mt-2 bg-transparent hover:bg-purple-300 cursor-pointer shadow-none'>
						<Trash2 className='size-6 shrink-0 group-hover:stroke-white stroke-gray-700 duration-150' />
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[250px]'>
					<DialogHeader>
						<DialogTitle>Уверены что хотите удалить товар?</DialogTitle>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button
								variant='outline'
								className='bg-purple-100 hover:bg-purple-50 border-0'
							>
								Нет
							</Button>
						</DialogClose>
						<Button
							type='submit'
							onClick={() => {
								deleteProductCart(product.ID_товара_корзины)
								product.isCart = false
							}}
							className='bg-purple-400 hover:bg-purple-300'
						>
							Да
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}
