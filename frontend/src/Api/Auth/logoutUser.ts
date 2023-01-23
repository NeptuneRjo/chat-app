export const logoutUser = async (): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/auth/logout`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}
	)

	return response
}
