"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const models_1 = require("../../models");
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => {
    models_1.User.findOne({ username: username }, async (err, user) => {
        if (err)
            return done(err);
        if (!user)
            return done(null, false);
        if (password !== user.password) {
            const comparePass = await bcrypt_1.default.compare(password, user.password);
            if (comparePass)
                return done(null, user);
        }
    });
}));
