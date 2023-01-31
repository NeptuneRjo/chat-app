import React, { useState } from 'react'
import { UserInterface } from '../../types'
import { postLoginUser } from '../../Api'
import { useNavigate } from 'react-router-dom'
import { defineSessionStorage } from '../../Global/utils'

type Props = {
	setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
	setToken: React.Dispatch<React.SetStateAction<string>>
}

const Login: React.FC<Props> = ({ setUser, setToken }: Props) => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const [error, setError] = useState<boolean>(false)

	const navigate = useNavigate()

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (username.length > 1 && password.length > 1) {
			const response = await postLoginUser(username, password)
			const json = await response.json()

			if (response.ok) {
				const { user, rooms, token } = json.data

				setUser({ user, rooms })
				setToken(token)
				defineSessionStorage(token, { user, rooms })

				setUsername('')
				setPassword('')

				navigate('/')
			} else {
				setError(true)
			}
		}
	}

	return (
		<div id='login-main'>
			<form
				onSubmit={(e) => {
					handleFormSubmit(e)
				}}
			>
				<div id='login-section'>
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
				<div id='login-section'>
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
				{error && <p className='error'>Invalid username or password</p>}
				<button type='submit'>Sign in</button>
			</form>
			<a href='#/user/register'>or click here to register...</a>
		</div>
	)
}

export default Login
