import httpStatus from "http-status";
import APIError from "../helpers/api-error";

import mongoose from "../server/mongo";
import utils from "./utils";

export const TransferSchema = new mongoose.Schema({
    sender: {
        type: String, // Username of the sender
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transferAt: {
        type: Date,
        default: Date.now(),
    },
}, utils.genSchemaConf((doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
}));

/**
 * Statics
 */
TransferSchema.statics = {
    /**
     * List transfers of an account in descending order of 'transferAt' timestamp
     * @param {String} username - Username of the sender
     * @returns {Promise<Transfer[]>}
     */
    get(username) {
        return this
            .find({sender: username})
            .sort({ transferAt: - 1})
            .exec()
    },

    /**
     * Create a new transfer
     * @param {String} sender - Username of the sender
     * @param {Number} amount - Amount of the transfer
     * @returns {Promise<Transfer>}
     */
    create(sender, amount) {
        let transfer = new this();
        transfer.sender = sender;
        transfer.amount = amount;
        return transfer.save();
    },
};

/**
 * @typedef Transfer
 */
export default mongoose.model("Transfer", TransferSchema);