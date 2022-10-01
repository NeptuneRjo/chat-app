import React, { useState, useEffect } from 'react'
import { Container, Col, Row, InputGroup, Form } from 'react-bootstrap'
import { Message } from '../../Components'
import { MessageInterface, UserInterface } from '../../types'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'
import { getRoom } from '../../Api'

type Props = {
	user: UserInterface | undefined
}

const Room: React.FC<Props> = ({ user }: Props) => {
	const { id } = useParams()

	const titleProperties = id?.split('-')
	let title: string = '1'

	if (titleProperties) {
		title = titleProperties[1]
	}

	const navigate = useNavigate()

	const [messages, setMessages] = useState<MessageInterface[]>([])
	const [roomError, setRoomError] = useState<unknown | null>(null)

	useEffect(() => {
		;(async () => {
			const response = await getRoom(id as string)
			const json = await response.json()

			if (!response.ok) {
				setRoomError(json.err)
			} else {
				setMessages(json.data.messages)
			}

			if (roomError) {
				navigate('/404-not-found')
			}
		})()
	}, [])

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
