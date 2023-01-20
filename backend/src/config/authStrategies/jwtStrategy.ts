import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import { User } from '../../models'

import 'dotenv/config'

const secretOrKey = process.env.JWT_SECRET_DEV

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
			secretOrKey,
		},
		async (payload, done) => {
			try {
				const user = await User.findById(payload.id)

				if (user) {
					done(null, user)
				} else {
					done(null, false)
				}
			} catch (error) {
				console.log(error)
			}
		}
	)
)
