import Transfer from "../models/transfer";

/**
 * List all the transfer of an user
 * @return {Transfer[]}
 */
function get(req, res, next) {
     const user = req.object.last().el();
     Transfer.get(user.username)
        .then(transfers => res.json({transfers: transfers}))
        .catch(e => next(e));
}

/**
 * Create new transfer
 * @property {string} req.params.userId - The username of the sender.
 * @property {number} req.body.amount - The amount of the transfer.
 */
function create(req, res, next) {
    Transfer.create(req.params.userId, req.body.amount)
        .then(transfer => res.json(transfer))
        .catch(e => next(e));
}

export default {get, create};
