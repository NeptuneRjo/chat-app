export const deleteRoom = async (roomId: string, authToken: string) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/chat/${roomId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': authToken,
			},
			credentials: 'include',
		}
	)
}
