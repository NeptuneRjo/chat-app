import { Schema, model } from 'mongoose'

const messageModel = new Schema({
	handle: { type: String, required: true },
	message: { type: String, required: true },
	date: {
		type: Date,
		default: Date.now(),
	},
})

const Message = model('Message', messageModel)

export default Message
