import Cookies from 'js-cookie'
import { getUser } from '../Api'

//
export const getAndSetUser = async (token: string) => {
	Cookies.remove('x-auth-header')

	const response = await getUser(token)
	const { data, error } = await response.json()

	return { data, error }
}
