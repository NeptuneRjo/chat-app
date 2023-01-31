export const getUser = async (authToken: string) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/auth/user`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': authToken,
			},
			credentials: 'include',
		}
	)

	return response
}
