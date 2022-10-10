import Cookies from 'js-cookie'
import { getUser, logoutUser } from '../Api'

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
