export const getUser = async (): Promise<Response> => {
	const response: Response = await fetch('http://localhost:4000/auth/login', {
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		credentials: 'include',
	})

	return response
}
