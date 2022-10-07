import express from 'express'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect, connection, mongo } from 'mongoose'

let mongoServer: null | MongoMemoryServer = null

export const initializeMongoServer = async () => {
	mongoServer = await MongoMemoryServer.create()
	const mongoUri = mongoServer.getUri()

	connect(mongoUri)

	connection.on('error', (err) => {
		if (err.message.code === 'ETIMEDOUT') {
			console.log(err)
			connect(mongoUri)
		}
		console.log(err)
	})
}

export const deinitializeMongoServer = async () => {
	if (mongoServer) {
		await connection.dropDatabase()
		await connection.close()
		await mongoServer.stop()
	}
}

export const dropCollections = async () => {
	if (mongoServer) {
		const collections = await connection.db.collections()

		for (let collection of collections) {
			await collection.drop()
		}
	}
}
