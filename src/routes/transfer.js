import express from "express";
import validate from "express-validation";
import Joi from "joi";

import auth from "../server/auth";
import defaultValidations from "../helpers/default-validations";
import transferCtrl from "../controllers/transfer";
import userCtrl from "../controllers/users"

const router = express.Router();

const validations = {
    create: {
        body: {
            amount: Joi.number().required(),
        }
    }
};

router.param("userId", validate(defaultValidations.userId));
router.param("userId", userCtrl.load);

router.route("/:userId")
    /** GET /transfer/:userId - Get transfer of an user */
    .get(auth.owner(), transferCtrl.get)

    /** POST /transfer/:userId - Create a transfer */
    .post(auth.user(), transferCtrl.create);

export default router;