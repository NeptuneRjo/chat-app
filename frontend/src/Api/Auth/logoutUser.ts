export const logoutUser = async (): Promise<Response> => {
	const response: Response = await fetch('http://localhost:4000/auth/logout', {
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'same-origin',
	})

	return response
}
