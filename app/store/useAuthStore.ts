import { create } from 'zustand'
import axios from '~/lib/axios'
import type { User, UserAuthData } from '~/types/index'
interface AuthState {
	authUser: User | null
	isLoggingIn: boolean
	isSigningUp: boolean
	isCheckingAuth: boolean
}

interface ProductActions {
	AuthMe: () => Promise<void>
	login: (data: UserAuthData) => Promise<void>
	signup: (data: any) => Promise<void>
	logout: () => Promise<void>
}
export const useAuthStore = create<AuthState & ProductActions>()(
	(set, get) => ({
		authUser: null,
		isLoggingIn: false,
		isSigningUp: false,
		isCheckingAuth: true,

		AuthMe: async () => {
			try {
				const storage = window.localStorage.getItem('token')

				const log = JSON.parse(storage || '')

				const res = await axios.post('/auth/login', log)
				const resData = res.data.data
				console.log(resData)
				set({ authUser: resData })
			} catch (error: any) {
				console.log(error)
				alert(error.response.data.message)
			} finally {
				set({ isCheckingAuth: false })
			}
		},
		login: async data => {
			set({ isLoggingIn: true })
			try {
				const res = await axios.post('/auth/login', data)
				const resData = res.data.data
				set({ authUser: resData })
				if ('ID_корзины' in resData) {
					window.localStorage.setItem(
						'token',
						`{"email": "${resData.Почта}", "password": "${resData.Пароль}"}`,
					)
				}
			} catch (error: any) {
				console.log(error)
				alert(error.response.data.message)
			} finally {
				set({ isLoggingIn: false })
			}
		},
		signup: async data => {
			set({ isSigningUp: true })
			try {
				const dataCorrect = {
					ФИ: data.name,
					Отчество: data.surname,
					email: data.email,
					password: data.password,
				}

				const res = await axios.post('/auth/signup', dataCorrect)
				const resData = res.data.data
				set({ authUser: resData })
				console.log(resData)
				if ('ID_корзины' in resData) {
					window.localStorage.setItem(
						'token',
						`{"email": "${resData.Почта}", "password": "${resData.Пароль}"}`,
					)
				}
			} catch (error: any) {
				alert(error.response.data.message)
			} finally {
				set({ isSigningUp: false })
			}
		},
		logout: async () => {
			try {
				window.localStorage.removeItem('token')
				set({ authUser: null })
			} catch (error: any) {
				console.log(error)
				alert(error.response.data.message)
			}
		},
	}),
)
