import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import faker from "faker";
import APIError from "../helpers/api-error";

import mongoose from "../server/mongo";
import utils from "./utils";

export const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        match: [/^[a-z0-9_]{1,15}$/, "The value of path {PATH} ({VALUE}) is not a valid username."],
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        set: (password) => {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        }
    },
    email: {
        type: String,
        unique: true,
        match: [/([\w\.]+)@([\w\.]+)\.(\w+)/, "The value of path {PATH} ({VALUE}) is not a valid email address."],
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    lastLogAt: {
        type: Date,
        default: Date.now(),
    }
}, utils.genSchemaConf((doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
}));

/**
 * Virtuals fields
 */
UserSchema.virtual("username")
    .get(function () {
        return this._id ? this._id : null;
    });

/**
 * Statics
 */
UserSchema.statics = {
    /**
     * Check if user exist
     * @param {String} id - This _id of user
     * @returns {Promise<Boolean>}
     */
    exist(id) {
        return this.findById(id)
            .exec()
            .then((user) => {
                return user !== null;
            });
    },

    /**
     * Get user
     * @param {String} id - This _id of user
     * @returns {Promise<User, Error>}
     */
    get(id) {
        return this
            .findById(id)
            .exec()
            .then(user => {
                if (user) {
                    user.lastLogAt = Date.now();
                    return user;
                }
                const err = new APIError(["No such user exists"], httpStatus.NOT_FOUND);
                return Promise.reject(err);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },

    /**
     * Create a new user
     * @param {String} username
     * @param {String} password
     * @param {String} email
     * @returns {Promise<User>}
     */
    create(username, password, email) {
        let user = new this();
        user._id = username;
        user.password = password;
        user.email = email;
        return user.save();
    },

    /**
     * Create a new user w/ role
     * @param {String} username
     * @param {String} password
     * @param {String} email
     * @param {String} role
     * @returns {Promise<User>}
     */
    createOrUpdate(username, password, email, role) {
        return this.findById(username)
            .then(exist => {
                let user;
                if (exist) {
                    user = exist;
                }
                else {
                    user = new this();
                    user._id = username;
                }
                user.password = password;
                user.email = email;
                user.role = role;
                return user.save();
            });
    },
};

/**
 * @typedef User
 */
export default mongoose.model("User", UserSchema);