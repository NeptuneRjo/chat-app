import React, { useState } from 'react'
import { postRegisterUser } from '../../Api'
import { useNavigate } from 'react-router-dom'
import { UserInterface } from '../../types'
import { defineSessionStorage } from '../../Global/utils'

export const passwordValidation = (password1: string, password2: string) => {
	return password1 === password2
}

type Props = {
	setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
	setToken: React.Dispatch<React.SetStateAction<string>>
}

const Register: React.FC<Props> = ({ setToken, setUser }: Props) => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [password2, setPassword2] = useState<string>('')
	const [error, setError] = useState<boolean>(false)

	const navigate = useNavigate()

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (username.length > 0 && password.length > 0 && password2.length > 0) {
			const valid = passwordValidation(password, password2)

			if (valid) {
				const response = await postRegisterUser(username, password, password2)
				const json = await response.json()

				if (response.ok) {
					const { user, rooms, token } = json.data

					setUser({ user, rooms })
					setToken(token)
					defineSessionStorage(token, { user, rooms })

					navigate('/')
				} else {
					setError(true)
				}
			}
		}
	}

	return (
		<div id='register-main'>
			<form
				onSubmit={(e) => {
					handleFormSubmit(e)
				}}
			>
				<div id='register-section'>
					<label>
						Username:
						<input
							type='text'
							name='username'
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
					</label>
				</div>
				<div id='register-section'>
					<label>
						Password:
						<input
							type='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</label>
				</div>
				<div id='register-section'>
					<label>
						Re-enter Password:
						<input
							type='password'
							name='password2'
							onChange={(e) => setPassword2(e.target.value)}
							value={password2}
						/>
					</label>
				</div>
				<button type='submit'>Sign up</button>
			</form>
		</div>
	)
}

export default Register
