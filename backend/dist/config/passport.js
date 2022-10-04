"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const models_1 = require("../models");
require("dotenv/config");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.CALLBACK_URL;
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://chat-app-0iem.onrender.com/auth/google/callback',
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, profile, done) {
    models_1.User.findOneAndUpdate({ googleId: profile.id }, {
        $set: {
            googleId: profile.id,
            picture: profile.picture,
            displayName: profile.displayName,
        },
    }, { upsert: true }, (err, user) => {
        return done(err, user);
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(async (id, done) => {
    const user = await models_1.User.findById(id);
    done(null, user);
});
