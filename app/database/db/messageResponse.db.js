import AutoReplyModel from "../models/autoReply.model";

class AutoReply {
    constructor() {
        this.reply = AutoReplyModel;
    }

    async createAutoReply(keyword, response) {
        let date = moment().format("DD/MM/YY HH:mm:ss");
        await this.reply.create({ session_name, session_number, keyword, date, response });
    }
}
export { AutoReply };