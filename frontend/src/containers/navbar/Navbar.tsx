import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className='navbar-main'>
			<h4 className='navbar-title heading-4'>
				<Link to='/chat'>Chat App</Link>
			</h4>
			<div className='navbar-links'>
				<div className='navbar-links-item btn-p'>
					<Link to='/account'>Sign up</Link>
				</div>
				<div className='navbar-links-item btn-s'>
					<Link to='/account'>Log in</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar
