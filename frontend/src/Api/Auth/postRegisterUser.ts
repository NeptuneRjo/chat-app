export const postRegisterUser = async (
	username: string,
	password: string,
	password2: string
) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/chat/register`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password, password2 }),
			credentials: 'same-origin',
		}
	)

	return response
}
