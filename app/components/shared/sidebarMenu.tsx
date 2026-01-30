import { NavLink } from 'react-router'
import { Filter } from './filter'
import { Logout } from './logout'
import { Search } from './search'

export const SidebarMenu = () => {
	return (
		<div className='bg-purple-300 py-5 mb-5'>
			<div className='max-w-300 mx-auto flex justify-between items-center gap-4 flex-wrap px-3'>
				<div className='flex gap-1.5 py-1 px-1.5 border rounded-md bg-white '>
					<NavLink
						to={'/'}
						className={({ isActive }) =>
							`hover:bg-neutral-200/70 py-1.5 px-2.5 rounded-sm duration-150 ${
								isActive ? 'bg-neutral-200/70' : ''
							}`
						}
					>
						Каталог
					</NavLink>
					<NavLink
						to={'/cart'}
						className={({ isActive }) =>
							`hover:bg-neutral-200/70 py-1.5 px-2.5 rounded-sm duration-150 ${
								isActive ? 'bg-neutral-200/70' : ''
							}`
						}
					>
						Корзина
					</NavLink>
				</div>
				<Search className=' grow-7' />
				<div>
					<Filter />
				</div>
				<div>
					<Logout />
				</div>
			</div>
		</div>
	)
}
