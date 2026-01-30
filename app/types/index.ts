export interface Product {
	ID_товара: number
	Название: string
	Количество: number
	Описание: string
	Категория: string
	Изображение: string
	Цена: number
	ID_товара_корзины?: number
	isCart: boolean
}

export interface Category {
	value: string
	label: string
}
export interface User {
	ID_Клиента: number
	ID_корзины: number
	ФИ: string
	Отчество?: string
	email: string
	password: string
}

export interface UserAuthData {
	ID_Клиента?: number
	ID_корзины?: number
	ФИ?: string
	Отчество?: string
	email?: string
	password?: string
}
