"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const models_1 = require("../../models");
require("dotenv/config");
const secretOrKey = process.env.JWT_SECRET_DEV;
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('x-auth-token'),
    secretOrKey,
}, async (payload, done) => {
    try {
        const user = await models_1.User.findById(payload.id);
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    }
    catch (error) {
        console.log(error);
    }
}));
