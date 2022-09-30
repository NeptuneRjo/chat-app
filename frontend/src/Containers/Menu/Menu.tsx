import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { UserInterface } from '../../types'

type Props = {
	user: UserInterface
}

const Menu: React.FC = ({}) => {
	const user = {
		displayName: 'King Neptune',
	}

	return (
		<Navbar expand='lg' bg='primary' variant='dark'>
			<Container>
				<Navbar.Brand href='/chat-room'>Chat App</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavDropdown title='Rooms' id='basic-nav-dropdown'>
							<NavDropdown.Item href='chat-room/1'>Room 1</NavDropdown.Item>
							<NavDropdown.Item href='chat-room/2'>Room 2</NavDropdown.Item>
							<NavDropdown.Item href='chat-room/3'>Room 3</NavDropdown.Item>
						</NavDropdown>
						{user === undefined ? (
							<Nav.Link href='/user-auth'>Sign in</Nav.Link>
						) : (
							<Navbar.Collapse className='justify-content-end'>
								<Navbar.Text>Signed in as {user.displayName}</Navbar.Text>
								<Nav.Link href='/user-auth/sign-out'>Sign Out</Nav.Link>
							</Navbar.Collapse>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Menu
