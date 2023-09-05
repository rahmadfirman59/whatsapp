import { AutoReply } from "../database/db/messageResponse.db";

export default class AutoReplyController extends AutoReply {
    constructor() {
        super();
    }
    async createReply(req, res) {
        try {
            let { session, keyword, respon } = req.body;
            if (!session && !keyword && !respon) {
                return res.send({ status: 400, message: `Input Data Keyword & Response` });
            }
            let session_number = session.split(" (+")[1].replace(")", "").trim();
            let session_name = session.split(" (")[0];
            let check = await this.checkExistAutoReply(session_number, keyword);
            if (check) {
                return res.send({ status: 403, message: `Cannot Create Auto Reply With Keyword ${keyword} Again in Same Session ${session_number}` });
            } else {
                await this.createAutoReply(session_name, session_number, keyword, respon);
                return res.send({ status: 200, message: `Success Add Auto Reply With Keyword ${keyword}` });
            }

        } catch {
            console.log(error);
            res.send({ status: 500, message: "Internal Server Error!" });
        }
    }
}