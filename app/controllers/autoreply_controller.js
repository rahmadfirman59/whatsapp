const whatsapp = require("wa-multi-session");
const ValidationError = require("../../utils/error");
const { responseSuccessWithData } = require("../../utils/response");
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'wasender'
});


exports.createReply = async (req, res, next) => {
    let { code, text } = req.body;
    connection.query("INSERT INTO autoreply (code, text) VALUES (?,?)", [req.body.code, req.body.text])
    res.status(200).json(
        responseSuccessWithData({
            status: "Berhasil",
            body: ""
        })
    );
}