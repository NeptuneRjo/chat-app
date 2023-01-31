import React from 'react'
import { UserInterface } from '../../types'
import { Register, Login } from '../../Components'

type Props = {
	props: {
		setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
		setToken: React.Dispatch<React.SetStateAction<string>>
	}
}

const AuthForm: React.FC<Props> = ({ props }: Props) => {
	const { setUser, setToken } = props

	return (
		<div id='authform-main'>
			<div id='authform-login'>
				<Login setUser={setUser} setToken={setToken} />
			</div>
			<div id='authform-register'>
				<Register setUser={setUser} setToken={setToken} />
			</div>
		</div>
	)
}

export default AuthForm
