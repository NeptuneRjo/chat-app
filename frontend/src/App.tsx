import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Menu, Room } from './Containers'
import { UserInterface } from './types'
import { io } from 'socket.io-client'
import { getAndSet } from './Global/utils'
import { getUser } from './Api'

import './App.css'
import 'bootswatch/dist/lux/bootstrap.min.css'

function App() {
	const socket = io(`${process.env.REACT_APP_API_URL}`, {
		transports: ['websocket'],
	})

	const [appError, setAppError] = useState<unknown | null>(null)
	const [user, setUser] = useState<undefined | UserInterface>(undefined)

	useEffect(() => {
		;(async () => {
			const { data, error } = await getAndSet(getUser)
			console.log('get user')

			data ? setUser(data) : setAppError(error)
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
