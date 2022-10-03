import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { UserInterface } from '../../types'
import { logoutUser } from '../../Api'

type Props = {
	user: UserInterface | undefined
	setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
}

const Menu: React.FC<Props> = ({ user, setUser }: Props) => {
	const login = async () => {
		window.open(`'${process.env.REACT_APP_API_URL}/auth/google'`, '_self')
	}

	const logout = async () => {
		const response = await logoutUser()
		const json = await response.json()

		setUser(json.data)
	}

	return (
		<Navbar expand='lg' bg='primary' variant='dark'>
			<Container>
				<Navbar.Brand href='/chat-room'>Chat App</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavDropdown title='Rooms' id='basic-nav-dropdown'>
							<NavDropdown.Item href='#/chat/room-1'>Room 1</NavDropdown.Item>
							<NavDropdown.Item href='#/chat/room-2'>Room 2</NavDropdown.Item>
							<NavDropdown.Item href='#/chat/room-3'>Room 3</NavDropdown.Item>
						</NavDropdown>
						{user === undefined ? (
							<Nav.Link onClick={() => login()}>Sign in</Nav.Link>
						) : (
							<Navbar.Collapse className='justify-content-end'>
								<Navbar.Text className='text-white'>
									Signed in as {user.displayName}
								</Navbar.Text>
								<Nav.Link onClick={() => logout()}>Sign Out</Nav.Link>
							</Navbar.Collapse>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Menu
