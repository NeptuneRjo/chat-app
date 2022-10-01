import { model, Schema } from 'mongoose'

const roomModel = new Schema({
	messages: { type: Array },
	roomId: { type: String },
})

const Room = model('Room', roomModel)

export default Room
