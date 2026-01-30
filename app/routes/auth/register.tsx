import { Link } from 'react-router'
import { FormInternal } from '~/components/shared/login/FormInternal'
import { VerticalCenterContainer } from '~/components/shared/login/verticalCenterContainer'
import { Button } from '~/components/ui/button'
import { useAuthStore } from '~/store/useAuthStore'

function Registration() {
	const { signup, isSigningUp } = useAuthStore()

	return (
		<VerticalCenterContainer
			className={'max-w-75  space-y-6 lg:before:h-[80%]'}
		>
			<div className='inline-block align-middle'>
				<div className='flex my-5'>
					<Link to={'/login'}>
						<Button
							type='submit'
							variant='link'
							size='icon'
							className='w-9 p-0'
						></Button>
					</Link>
					<h1 className='ml-11 font-semibold text-2xl'>Регистрация</h1>
				</div>

				<FormInternal
					isLauding={isSigningUp}
					isName
					isSurname
					isEmail
					isPassword
					isUserID
					className='mt-10'
					classButton='mt-12'
					onFunction={signup}
				>
					<div className='flex gap-2.5 w-100 max-w-67 justify-center'>
						Зарегистрироваться
					</div>
				</FormInternal>

				<Link to={'/'}>
					<div className='mt-1 mb-14 flex justify-center text-sm cursor-pointer'>
						Есть аккаунт?
						<span className='text-[#2F00FF] ml-[0.30rem]'>Войти</span>
					</div>
				</Link>
			</div>
		</VerticalCenterContainer>
	)
}

export default Registration
