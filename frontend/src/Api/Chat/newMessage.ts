export const newMessage = async (
	roomId: string,
	message: { handle: string; message: string }
) => {
	const response = await fetch(
		`${process.env.REACT_APP_API_URL}/chat/${roomId}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'same-origin',
			body: JSON.stringify(message),
		}
	)

	return response
}
