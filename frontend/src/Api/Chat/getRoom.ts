export const getRoom = async (roomId: string): Promise<Response> => {
	const response: Response = await fetch(`/chat/${roomId}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'same-origin',
	})

	return response
}
