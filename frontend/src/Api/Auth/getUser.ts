export const getUser = async (): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/auth/login`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json; charset=UTF-8',
				'Access-Control-Allow-Credentials': 'true',
			},
			credentials: 'include',
		}
	)

	return response
}
