import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Menu } from './Containers'
import 'bootswatch/dist/lux/bootstrap.min.css'

import './App.css'

function App() {
	return (
		<HashRouter>
			<div className='app-main'>
				<Menu />
				<div className='app-content'>
					{/* <General roomsList={rooms} room={room} /> */}
					<Routes>
						<Route element={<div className='chat-room'></div>}></Route>
					</Routes>
				</div>
			</div>
		</HashRouter>
	)
}

export default App
