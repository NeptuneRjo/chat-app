import { model, Schema } from 'mongoose'

const roomModel = new Schema({
	messages: { type: Array, required: true },
	roomId: { type: String, required: true },
	users: { type: Array, required: true },
})

roomModel.methods.generateUUID = async function () {}

const Room = model('Room', roomModel)

export default Room
