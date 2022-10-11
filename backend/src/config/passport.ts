import passport from 'passport'
import { User } from '../models'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

import 'dotenv/config'

/* GOOGLE STRATEGY */

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string
const GOOGLE_CALLBACK_URL = process.env.CALLBACK_URL as string

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: GOOGLE_CALLBACK_URL,
			passReqToCallback: true,
		},
		function (
			request: any,
			accessToken: any,
			refreshToken: any,
			profile: any,
			done: (arg0: any, arg1: any) => any
		) {
			User.findOneAndUpdate(
				{ googleId: profile.id },
				{
					$set: {
						googleId: profile.id,
						picture: profile.picture,
						displayName: profile.displayName,
					},
				},
				{ upsert: true },
				(err: any, user: any) => {
					return done(err, user)
				}
			)
		}
	)
)

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, user)
	})
})

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user as Express.User)
	})
})
