import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router'
import { z } from 'zod'
import { Loader } from '~/components/shared/loader'
import { Button } from '~/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { cn } from '~/lib/utils'
import { useAuthStore } from '~/store/useAuthStore'
import type { UserAuthData } from '~/types/index'

const messageMinMax = (min: number, max: number) => {
	return { message: `Введите от ${min} до ${max} символов` }
}

interface FormConfig {
	name: string
	label: string
	placeholder: string
	isUse?: boolean
	description?: string
}

interface Props {
	className?: string
	classForm?: string
	classButton?: string
	onFunction: (data: UserAuthData) => Promise<void>
	isLauding: boolean
	isName?: boolean
	isSurname?: boolean
	isEmail?: boolean
	isPassword?: boolean
	isUserID?: boolean
}

export const FormInternal: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
	classButton,
	onFunction,
	isLauding,
	isName,
	isSurname,
	isEmail,
	isPassword,
}) => {
	const { authUser, AuthMe } = useAuthStore()

	useEffect(() => {
		if (window.localStorage.getItem('token')) AuthMe()
	}, [AuthMe])

	const FormSchema = z.object({
		email: isEmail
			? z.string().email({
					message: 'Неправильный формат почты',
			  })
			: z
					.string()
					.email({
						message: 'Неправильный формат почты',
					})
					.optional()
					.or(z.literal('')),

		password: isPassword
			? z.string().min(5, messageMinMax(5, 50)).max(50, messageMinMax(5, 50))
			: z
					.string()
					.min(5, messageMinMax(5, 50))
					.max(50, messageMinMax(5, 50))
					.optional()
					.or(z.literal('')),

		name: isName
			? z.string().min(3, messageMinMax(3, 50)).max(50, messageMinMax(3, 50))
			: z
					.string()
					.max(50, messageMinMax(3, 50))
					.min(3, messageMinMax(3, 50))
					.optional()
					.or(z.literal('')),
		surname: z
			.string()
			.max(50, messageMinMax(3, 50))
			.min(3, messageMinMax(3, 50))
			.optional()
			.or(z.literal('')),
	})
	type FormSchemaType = z.infer<typeof FormSchema>

	const form = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: authUser?.ФИ,
			surname: authUser?.Отчество,
			email: authUser?.email || 'ivanov@example.ru',
			password: authUser?.password || '7bT9xPqW',
		},
	})

	const formConfig: FormConfig[] = [
		{
			name: 'name',
			label: 'Имя и фамилия',
			placeholder: 'Иван',
			isUse: isName,
		},
		{
			name: 'surname',
			label: 'Отчество',
			placeholder: 'Иванович',
			isUse: isSurname,
		},
		{
			name: 'email',
			label: 'Почта',
			placeholder: 'text@mail.com',
			isUse: isEmail,
		},
		{
			name: 'password',
			label: 'Пароль',
			placeholder: '••••••',
			isUse: isPassword,
		},
	]

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const formData: Partial<FormSchemaType> = Object.entries(data).reduce(
			(acc, [key, value]) => {
				if (value) {
					acc[key as keyof FormSchemaType] = value
				}
				return acc
			},
			{} as Partial<FormSchemaType>,
		)

		onFunction(formData)
	}
	if (globalThis.localStorage?.getItem('token') !== null) {
		return <Navigate to='/' />
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn('-mt-2 text-lg w-75', className)}
			>
				{formConfig.map((config, index) => (
					<div key={index}>
						{config.isUse && (
							<FormField
								control={form.control}
								name={config.name as keyof FormSchemaType}
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>{config.label}</FormLabel>
											<FormControl>
												<Input placeholder={config.placeholder} {...field} />
											</FormControl>
											<FormDescription>{config.description}</FormDescription>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						)}
					</div>
				))}
				<Button
					type='submit'
					className={cn('mt-[20%]', classButton)}
					disabled={isLauding}
				>
					{isLauding ? (
						<div className='flex gap-2.5 text-base w-100 max-w-67 justify-center '>
							<Loader />
							Загрузка...
						</div>
					) : (
						children
					)}
				</Button>
			</form>
		</Form>
	)
}
