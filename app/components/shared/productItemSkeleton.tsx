import { Skeleton } from '~/components/ui/skeleton'

export function ProductItemSkeleton() {
	return (
		<div className='border-3  rounded-2xl p-3 '>
			<Skeleton className='w-full h-45 rounded-2xl mb-3' />
			<div className='space-y-2'>
				<Skeleton className='h-5 w-full' />
				<Skeleton className='h-5 w-13' />
				<Skeleton className='h-8 w-full' />
			</div>
		</div>
	)
}
