import { useEffect } from 'react'
import { Outlet } from 'react-router'
import type { Route } from './+types/LayoutPage'
import { SidebarMenu } from './components/shared/sidebarMenu'
import { useAuthStore } from './store/useAuthStore'
import { useProductStore } from './store/useProductStore'
export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Product catalog' },
		{ name: 'description', content: 'Welcome to React Router!' },
	]
}
export default function LayoutPage() {
	const { fetchProducts, isProductDelete } = useProductStore()
	const { authUser } = useAuthStore()
	useEffect(() => {
		if (!authUser) return
		fetchProducts(authUser.ID_корзины)
	}, [fetchProducts, isProductDelete])
	return (
		<>
			<SidebarMenu />
			<Outlet />
		</>
	)
}
