import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import { User } from '../models'
import 'dotenv/config'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_CALLBACK_URL = process.env.CALLBACK_URL

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID as string,
			clientSecret: GOOGLE_CLIENT_SECRET as string,
			callbackURL: 'https://chat-app-0iem.onrender.com/auth/google/callback',
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

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id)
	done(null, user)
})
