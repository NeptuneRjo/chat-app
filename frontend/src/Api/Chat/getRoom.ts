export const getRoom = async (roomId: string): Promise<Response> => {
	const response: Response = await fetch(
		`http://localhost:4000/chat/${roomId}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}
	)

	return response
}
