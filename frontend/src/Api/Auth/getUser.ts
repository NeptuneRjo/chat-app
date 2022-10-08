export const getUser = async (token: string): Promise<Response> => {
	const response: Response = await fetch(`/auth/login`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			'X-auth-token': token,
		},
		credentials: 'include',
	})

	return response
}
