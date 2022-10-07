import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Menu, Room } from './Containers'
import 'bootswatch/dist/lux/bootstrap.min.css'
import { getUser } from './Api'
import { UserInterface } from './types'
import { io, Socket } from 'socket.io-client'
import Cookies from 'js-cookie'

import './App.css'

function App() {
	const socket = io(`${process.env.REACT_APP_API_URL}`, {
		transports: ['websocket'],
	})

	const [error, setError] = useState<unknown | null>(null)
	const [user, setUser] = useState<undefined | UserInterface>(undefined)

	useEffect(() => {
		;(async () => {
			const cookiesJwt = Cookies.get('x-auth-cookie')

			if (cookiesJwt) {
				Cookies.remove('x-auth-cookie')

				const response = await getUser(cookiesJwt)
				const json = await response.json()

				if (!response.ok) {
					setError(json.error)
				} else {
					setUser(json.data)
				}
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
