export const patchJoinRoom = async (roomId: string, authToken: string) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/chat/join-room/${roomId}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': authToken,
			},
			credentials: 'include',
		}
	)

	return response
}
