const { Router } = require("express");
const MessageRouter = require("./message_router");
const SessionRouter = require("./session_router");
const AutoReplyRouter = require("./autoReply.router");

const MainRouter = Router();

MainRouter.use(SessionRouter);
MainRouter.use(MessageRouter);
MainRouter.use(AutoReplyRouter);
MainRouter.use(AutoReplyRouter);

module.exports = MainRouter;
