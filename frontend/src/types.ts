export interface RoomInterface {
	id: string
	messages: MessageInterface[]
	members: UserInterface[]
}

export interface MessageInterface {
	author: UserInterface
	message: string
	date: string
}

export interface UserInterface {
	googleId: string
	picture: string
	displayName: string
}
