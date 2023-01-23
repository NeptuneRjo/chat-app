export const postLoginUser = async (username: string, password: string) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/auth/login`,
		{
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({ username, password }),
			credentials: 'same-origin',
		}
	)

	return response
}
