export const getAndSet = async (
	api: Function,
	id: string | undefined = undefined,
	body: string | object | undefined = undefined
) => {
	const response = await api(id, body)
	const { data, error } = await response.json()

	return { data, error }
}
