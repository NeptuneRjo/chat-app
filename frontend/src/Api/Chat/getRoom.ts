export const getRoom = async (roomId: string): Promise<Response> => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/chat/${roomId}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}
	)

	return response
}
