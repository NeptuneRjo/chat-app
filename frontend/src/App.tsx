import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Menu, Room } from './Containers'
import 'bootswatch/dist/lux/bootstrap.min.css'

import './App.css'

function App() {
	return (
		<HashRouter>
			<div className='app-main bg-dark'>
				<Menu />
				<Routes>
					<Route path='/' element={<Room />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
