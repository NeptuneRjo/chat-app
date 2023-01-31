import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Menu, Room, Login, Register } from './Containers'
import { UserInterface } from './types'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { getAndSet } from './Global/utils'
import { getUser } from './Api'

import './App.css'
import 'bootswatch/dist/lux/bootstrap.min.css'

function App() {
	const socket = io(`${process.env.REACT_APP_API_URL}`, {
		transports: ['websocket'],
	})

	const [appError, setAppError] = useState<unknown | null>(null)
	const [user, setUser] = useState<null | UserInterface>(null)
	const [token, setToken] = useState<string>('')
	const [rooms, setRooms] = useState<any>()

	const navigate = useNavigate()

	useEffect(() => {
		const sessionToken = window.sessionStorage.getItem('userToken')

		;(async () => {
			// const { data, error } = await getAndSet(getUser)
			// console.log('get user')
			// data ? setUser(data) : setAppError(error)
			if (sessionToken) {
				const response = await getUser(sessionToken)
				const json = await response.json()

				if (response.ok) {
					setToken(sessionToken)

					setUser(json.data)

					json.data.rooms.forEach((room: any) => {
						setRooms([...rooms, room])
					})
				}
			}

			if (!user) {
				navigate('/user/login')
			}
		})()
	}, [user])

	return (
		<div className='app-main bg-dark'>
			<Menu user={user} setUser={setUser} />
			<Routes>
				<Route
					path='/chat/:id'
					element={<Room user={user} socket={socket} />}
				/>
				<Route
					path='/user/login'
					element={<Login setToken={setToken} setUser={setUser} />}
				/>
				<Route
					path='/user/register'
					element={<Register setToken={setToken} setUser={setUser} />}
				/>
				<Route path='/' element={<Navigate to='/chat/room-1' />} />
			</Routes>
		</div>
	)
}

export default App
