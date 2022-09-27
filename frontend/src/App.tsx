import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './containers'
import './App.css'

function App() {
	return (
		<HashRouter>
			<div className='app-main'>
				<Navbar />
				<div className='app-content'>
					<div className='rooms'></div>
					<Routes>
						<Route element={<div className='chat-room'></div>}></Route>
					</Routes>
				</div>
			</div>
		</HashRouter>
	)
}

export default App
