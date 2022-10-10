import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Menu, Room } from './Containers'
import 'bootswatch/dist/lux/bootstrap.min.css'
import { UserInterface } from './types'
import { io } from 'socket.io-client'
import Cookies from 'js-cookie'
import { getAndSetUser } from './global/utils'

import './App.css'

function App() {
	const socket = io(`${process.env.REACT_APP_API_URL}`, {
		transports: ['websocket'],
	})

	const [appError, setAppError] = useState<unknown | null>(null)
	const [user, setUser] = useState<undefined | UserInterface>(undefined)

	useEffect(() => {
		;(async () => {
			const token = Cookies.get('x-auth-cookie')

			if (token) {
				const userResponse = await getAndSetUser(token)

				userResponse.data
					? setUser(userResponse.data)
					: setUser(userResponse.error)
			}
		})()
	}, [])

	return (
		<HashRouter>
			<div className='app-main bg-dark'>
				<Menu user={user} setUser={setUser} />
				<Routes>
					<Route
						path='/chat/:id'
						element={<Room user={user} socket={socket} />}
					/>
					<Route path='/' element={<Navigate to='/chat/room-1' />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
