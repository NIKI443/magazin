import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '~/store/useAuthStore'
import type { Route } from './+types/LayoutPage'
import GlobalSpinner from './routes/globalSpinner'
export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Product catalog' },
		{ name: 'description', content: 'Welcome to React Router!' },
	]
}
export default function LayoutPage() {
	const { isCheckingAuth, authUser, AuthMe } = useAuthStore()
	useEffect(() => {
		if (globalThis.localStorage?.getItem('token') !== null) AuthMe()
	}, [AuthMe])

	if (isCheckingAuth) return <GlobalSpinner />
	if (globalThis.localStorage?.getItem('token') == null && !authUser) {
		return <Navigate to='/login' />
	}

	return <Outlet />
}
