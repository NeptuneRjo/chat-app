import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Menu, Room } from './Containers'
import 'bootswatch/dist/lux/bootstrap.min.css'
import { getUser } from './Api'
import { UserInterface } from './types'

import './App.css'

function App() {
	const [error, setError] = useState<unknown | null>(null)
	const [user, setUser] = useState<undefined | UserInterface>(undefined)

	useEffect(() => {
		;(async () => {
			const response = await getUser()
			const json = await response.json()

			if (!response.ok) {
				setError(json.error)
			} else {
				setUser(json.data)
			}
		})()
	}, [])

	return (
		<HashRouter>
			<div className='app-main bg-dark'>
				<Menu user={user} setUser={setUser} />
				<Routes>
					<Route path='/' element={<Room user={user} />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
