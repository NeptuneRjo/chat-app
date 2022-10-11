import Cookies from 'js-cookie'
import { getUser, logoutUser, getRoom, newMessage } from '../Api'

//
export const getAndSetUser = async (token: string) => {
	Cookies.remove('x-auth-header')

	const response = await getUser(token)
	const { data, error } = await response.json()

	return { data, error }
}

export const logoutAndSetUser = async () => {
	const response = await logoutUser()
	const { data, error } = await response.json()

	return { data, error }
}

export const getAndSetRoom = async (id: string) => {
	const response = await getRoom(id)
	const { data, error } = await response.json()

	return { data, error }
}

export const getAndSetNewMessage = async (
	id: string,
	message: {
		handle: string
		message: string
	}
) => {
	const response = await newMessage(id, message)
	const { data, error } = await response.json()

	return { data, error }
}
