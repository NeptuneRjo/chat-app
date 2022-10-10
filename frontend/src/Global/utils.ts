import Cookies from 'js-cookie'
import { getUser } from '../Api'

//
export const getAndSetUser = async (token: string) => {
	Cookies.remove('x-auth-header')

	const response = await getUser(token)
	const json = await response.json()

	if (!response.ok) {
		return { data: null, error: json.error }
	} else {
		return { data: json.data, error: null }
	}
}
