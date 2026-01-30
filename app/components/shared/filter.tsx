import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '~/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '~/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/popover'
import { cn } from '~/lib/utils'
import { useProductStore } from '~/store/useProductStore'

interface Props {
	className?: string
}
export const Filter: React.FC<Props> = ({ className }) => {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState('')
	const { categories, filterProduct } = useProductStore()
	return (
		<div className={cn('', className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						className='w-[200px] justify-between'
					>
						{value
							? categories.find(category => category.value === value)?.label
							: 'Фильтр...'}
						<ChevronsUpDown className='opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0'>
					<Command>
						<CommandInput placeholder='Поиск...' className='h-9' />
						<CommandList>
							<CommandEmpty>Категория не найдена.</CommandEmpty>
							<CommandGroup>
								{categories.map(category => (
									<CommandItem
										key={category.value}
										value={category.value}
										onSelect={currentValue => {
											const selectedValue =
												currentValue === value ? '' : currentValue
											setValue(selectedValue)
											console.log(selectedValue)
											filterProduct(selectedValue)
											setOpen(false)
										}}
									>
										{category.label}
										<Check
											className={cn(
												'ml-auto',
												value === category.value ? 'opacity-100' : 'opacity-0',
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
