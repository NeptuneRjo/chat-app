export interface RoomInterface {
	roomId: string
	messages: MessageInterface[]
	users: { username: string; owner: boolean }[]
}

export interface MessageInterface {
	handle: string
	message: string
	date: string
}

export interface UserInterface {
	user: string
	rooms: RoomInterface[]
}
