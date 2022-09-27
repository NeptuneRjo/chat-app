import { model, Schema } from 'mongoose'

const roomModel = new Schema({
	members: { type: Array },
	messages: { type: Array },
})

const Room = model('Room', roomModel)

export default Room
