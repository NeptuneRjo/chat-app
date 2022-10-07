export const logoutUser = async (): Promise<Response> => {
	const response: Response = await fetch(`/auth/logout`, {
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	})

	return response
}
