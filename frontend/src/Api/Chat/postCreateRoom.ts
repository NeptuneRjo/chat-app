export const postCreateRoom = async (authToken: string) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/chat/create-room`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': authToken,
			},
			credentials: 'include',
		}
	)
}
