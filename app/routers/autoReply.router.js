const { Router } = require("express");
const {
    createReply
} = require("../controllers/autoreply_controller")
const AutoReplyRouter = Router();
AutoReplyRouter.all("/create-reply", createReply);

module.exports = AutoReplyRouter;