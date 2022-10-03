export const newMessage = async (
	roomId: string,
	message: { handle: string; message: string }
) => {
	const response = await fetch(`http://localhost:4000/chat/${roomId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(message),
	})

	return response
}
