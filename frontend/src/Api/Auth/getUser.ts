export const getUser = async (token: string): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/auth/login`,
		{
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				'X-auth-token': token,
			},
			credentials: 'include',
		}
	)

	return response
}
