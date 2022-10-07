import { model, Schema } from 'mongoose'

const roomModel = new Schema({
	messages: { type: Array, required: true },
	roomId: { type: String, required: true },
})

const Room = model('Room', roomModel)

export default Room
