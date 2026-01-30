import React from 'react'
import { cn } from '~/lib/utils'
import { useProductStore } from '~/store/useProductStore'
import { Input } from '../ui/input'

interface Props {
	className?: string
}

export const Search: React.FC<Props> = ({ className }) => {
	const { searchProduct } = useProductStore()

	return (
		<div className={cn('', className)}>
			<Input
				placeholder='Поиск...'
				onChange={e =>
					setTimeout(() => {
						searchProduct(e.target.value)
					}, 250)
				}
				className='bg-white w-full h-10.5 px-5'
			/>
		</div>
	)
}
