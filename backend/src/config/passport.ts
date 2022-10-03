import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import { User } from '../models'
import 'dotenv/config'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID as string,
			clientSecret: GOOGLE_CLIENT_SECRET as string,
			callbackURL: 'http://localhost:3000/auth/google/callback',
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
					console.log(user)
					return done(err, user)
				}
			)
		}
	)
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user as Express.User)
})
