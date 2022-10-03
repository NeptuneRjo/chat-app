import React, { useState, useEffect } from 'react'
import { Container, Col, Row, InputGroup, Form, Button } from 'react-bootstrap'
import { Message } from '../../Components'
import { MessageInterface, UserInterface } from '../../types'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'
import { getRoom, newMessage } from '../../Api'
import { Socket } from 'socket.io-client'

type Props = {
	user: UserInterface | undefined
	socket: any
}

const Room: React.FC<Props> = ({ user, socket }: Props) => {
	const { id } = useParams()

	const titleProperties = id?.split('-')
	let title: string = '1'

	if (titleProperties) {
		title = titleProperties[1]
	}

	const navigate = useNavigate()

	const [messages, setMessages] = useState<MessageInterface[]>([])
	const [roomError, setRoomError] = useState<unknown | null>(null)
	const [text, setText] = useState<string>('')
	const [oldId, setOldId] = useState<string>('room-1')

	useEffect(() => {
		/*
			Sets the oldId to id if the user routes to the room they're 
			already on. If the user chooses a new room, the oldId is maintained and the socket is disconnected from the old room.
		*/
		if (id === oldId) {
			setOldId(id)
		}

		;(async () => {
			const response = await getRoom(id as string)
			const json = await response.json()

			if (!response.ok) {
				setRoomError(json.err)
			} else {
				socket.emit('leave', oldId)
				socket.emit('join', id)

				setMessages(json.data.messages)
			}

			if (roomError) {
				navigate('/404-not-found')
			}
		})()
	}, [id])

	const submitMessage = async () => {
		const message = {
			handle: user?.displayName as string,
			message: text,
		}

		const response = await newMessage(id as string, message)
		const json = await response.json()
		const { messages } = json.data

		if (!response.ok) {
			setRoomError(json.err)
		} else {
			setText('')

			// after message is saved to DB, emit to socket.io
			socket.emit('chat', {
				id,
				messages: messages,
			})

			setMessages(messages)
		}
	}

	socket.on('chat', async (data: any) => {
		setMessages(data)
	})

	return (
		<Container className='p-3' id='room-main'>
			<h3 className='p-2'>Chat Room {title}</h3>
			<Row id='chat-container' className='bg-light pt-3'>
				{messages.map((message, key) => (
					<Row key={key}>
						<Col id='chat-incoming'>
							{message.handle !== user?.displayName && (
								<Message message={message} user={false} />
							)}
						</Col>
						<Col id='chat-outgoing'>
							{message.handle === user?.displayName && (
								<Message message={message} user={true} />
							)}
						</Col>
					</Row>
				))}
			</Row>
			<InputGroup size='sm' className='bg-dark'>
				{user ? (
					<>
						<Form.Control
							as='textarea'
							id='chat-input'
							placeholder='Have something to say?'
							className='bg-light'
							maxLength={150}
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<Button type='submit' onClick={() => submitMessage()}>
							Submit
						</Button>
					</>
				) : (
					<>
						<Form.Control
							as='textarea'
							id='chat-input'
							placeholder='Log in before chatting!'
							className='bg-light'
							disabled
						/>
						<Button type='submit' disabled>
							Submit
						</Button>
					</>
				)}
			</InputGroup>
		</Container>
	)
}

export default Room
