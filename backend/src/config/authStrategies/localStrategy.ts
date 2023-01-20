import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { User } from '../../models'

type UserType = {
	username: string
	password: string
}

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, async (err: unknown, user: any) => {
			if (err) return done(err)
			if (!user) return done(null, false)

			if (password !== user.password) {
				const comparePass = await bcrypt.compare(password, user.password)
				if (comparePass) return done(null, user)
			}
		})
	})
)
