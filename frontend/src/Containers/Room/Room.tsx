import React from 'react'
import { Container, Col, Row, InputGroup, Form } from 'react-bootstrap'
import './style.css'

const Room = () => {
	return (
		<Container className='p-3' id='room-main'>
			<h3 className='p-2'>Chat Room 1</h3>
			<Row id='chat-container' className='bg-light' />
			<InputGroup size='sm' className='bg-dark'>
				<Form.Control
					as='textarea'
					id='chat-input'
					placeholder='Have something to say?'
					className='bg-light'
				/>
			</InputGroup>
		</Container>
	)
}

export default Room
