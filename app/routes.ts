import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	route('/', 'MainLayoutPage.tsx', [
		route('', 'LayoutPage.tsx', [
			index('routes/home.tsx'),
			route('cart', 'routes/cart.tsx'),
		]),
	]),
	route('/login', 'routes/auth/login.tsx'),
	route('/signup', 'routes/auth/register.tsx'),
] satisfies RouteConfig
