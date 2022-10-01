import React from 'react'
import { Card } from 'react-bootstrap'
import { MessageInterface } from '../../types'
import './style.css'

type Props = {
	message: MessageInterface
	user: boolean
}

const Message: React.FC<Props> = ({ message, user }: Props) => {
	return (
		<Card className={`text-white ${user ? 'bg-primary user' : 'bg-dark'}`}>
			<Card.Text id='message-content' className='px-2 py-1'>
				{message.message}
			</Card.Text>
			<Card.Footer id='message-footer'>
				<img id='message-image' src={`${message.author.picture}`} />
				<small id='message-name'>{message.author.displayName}</small>
			</Card.Footer>
		</Card>
	)
}

export default Message
