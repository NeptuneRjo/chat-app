import React from 'react'
import { Container, Col, Row, InputGroup, Form } from 'react-bootstrap'
import { Message } from '../../Components'
import './style.css'

const Room = () => {
	const messages = [
		{
			author: {
				displayName: 'King Pluto',
				googleId: '1',
				picture:
					'https://lh3.googleusercontent.com/a-/ACNPEu-RdBeRgT0gWX-vQ21CoLJ-XjT8WdTRJI9iLPhLsw=s96-c',
			},
			message: 'Goodbye world',
			date: '16 days ago',
		},
		{
			author: {
				displayName: 'King Neptune',
				googleId: '1',
				picture:
					'https://lh3.googleusercontent.com/a-/ACNPEu-RdBeRgT0gWX-vQ21CoLJ-XjT8WdTRJI9iLPhLsw=s96-c',
			},
			message:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum error facilis voluptatibus quibusdam doloribus natus qui explicabo expedita recusand',
			date: '20 days ago',
		},
	]

	return (
		<Container className='p-3' id='room-main'>
			<h3 className='p-2'>Chat Room 1</h3>
			<Row id='chat-container' className='bg-light pt-3'>
				{messages.map((message, index) => (
					<Row>
						<Col id='chat-incoming'>
							{message.author.displayName !== 'King Neptune' && (
								<Message message={message} user={false} />
							)}
						</Col>
						<Col id='chat-outgoing'>
							{message.author.displayName === 'King Neptune' && (
								<Message message={message} user={true} />
							)}
						</Col>
					</Row>
				))}
			</Row>
			<InputGroup size='sm' className='bg-dark'>
				<Form.Control
					as='textarea'
					id='chat-input'
					placeholder='Have something to say?'
					className='bg-light'
					maxLength={150}
				/>
			</InputGroup>
		</Container>
	)
}

export default Room
