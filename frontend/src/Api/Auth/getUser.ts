export const getUser = async (): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/auth/login`,
		{
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'same-origin',
		}
	)

	return response
}
