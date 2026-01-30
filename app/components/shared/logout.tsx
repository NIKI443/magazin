import { Button } from '~/components/ui/button'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '~/components/ui/hover-card'
import { useAuthStore } from '~/store/useAuthStore'

export function Logout() {
	const { authUser, logout } = useAuthStore()

	return (
		<HoverCard openDelay={10} closeDelay={100}>
			<HoverCardTrigger asChild>
				<Button
					variant='outline'
					className='bg-white text-sm py-1.5 px-2.5 rounded-sm border'
				>
					{authUser?.Отчество
						? authUser?.ФИ + authUser?.Отчество
						: authUser?.ФИ}
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className='flex w-full max-w-50 flex-col gap-0.5 items-center '>
				<div className='font-semibold text-center'>
					Хотите выйти из аккаунта?
				</div>
				<Button
					variant='destructive'
					className='w-1/2 hover:bg-red-400 cursor-pointer'
					onClick={() => {
						logout()
					}}
				>
					Выйти
				</Button>
			</HoverCardContent>
		</HoverCard>
	)
}
