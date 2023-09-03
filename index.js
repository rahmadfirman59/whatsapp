const { config } = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");
const MainRouter = require("./app/routers");
const errorHandlerMiddleware = require("./app/middlewares/error_middleware");
const whatsapp = require("wa-multi-session");

config();

var app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
// Public Path
app.use("/p", express.static(path.resolve("public")));
app.use("/p/*", (req, res) => res.status(404).send("Media Not Found"));

app.use(MainRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || "5000";
app.set("port", PORT);
var server = http.createServer(app);
server.on("listening", () => console.log("APP IS RUNNING ON PORT " + PORT));

server.listen(PORT);

whatsapp.onConnected((session) => {
  console.log("connected => ", session);
});

whatsapp.onDisconnected((session) => {
  console.log("disconnected => ", session);
});

whatsapp.onConnecting((session) => {
  console.log("connecting => ", session);
});
whatsapp.onMessageReceived(async (msg) => {
  if (msg.key.fromMe || msg.key.remoteJid.includes("status")) return;



  let pilihan = msg.message.conversation || msg.message.extendedTextMessage.text;

  await whatsapp.readMessage({
    sessionId: msg.sessionId,
    key: msg.key,
  });
  await whatsapp.sendTyping({
    sessionId: msg.sessionId,
    to: msg.key.remoteJid,
    duration: 3000,
  });

  var head = "🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 \n LAYANAN VIRTUAL BKPSDM BONDOWOSO \n 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 \n ➖➖➖➖➖➖➖➖➖➖➖ \n @ BKPSDM Bondowoso \n ➖➖➖➖➖➖➖➖➖➖➖ \n ____________ \n ";
  var foot = "🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹 \n\n  Website : https://bkpsdm.bondowosokab.go.id/ \n\n FP BKPSDM Bondowoso : https://www.facebook.com/BKDBWS \n\n Instagram : https://instagram.com/bkpsdm.bondowoso \n\n Twitter :https://twitter.com/bondowosobkd?t=wAQXMvy59Tr2SUtmNNYsdw&s=09 \n\n Youtube : https://youtube.com/user/MunirBws \n\n Group Telegram BKPSDM BONDOWOSO : https://t.me/joinchat/g2g5bUoh_EEzNDhl";

  if (pilihan == "701") {
    await whatsapp.sendTextMessage({
      sessionId: msg.sessionId,
      to: msg.key.remoteJid,
      text: "Hello!",
      answering: msg, // for quoting message
    });
  } else if (pilihan == "702") {
    await whatsapp.sendTextMessage({
      sessionId: msg.sessionId,
      to: msg.key.remoteJid,
      text: "Hello! 702",
      answering: msg, // for quoting message
    });
  } else {

  }

});

whatsapp.loadSessionsFromStorage();
