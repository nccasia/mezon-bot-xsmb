const fs = require("fs");
const path = require("path");
const { sendMessage } = require("../../utils");

const msgHelp = "```*xsmb DD/MM/YYYY```";
module.exports = {
  execute: async (client, event, args) => {
    try {
      const dateArg = args[0];
      if (!dateArg) {
        return sendMessage(client, event, msgHelp);
      }

      const dataFilePath = path.join(__dirname, "../../data/lottery_data.json");
      const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
      const result = data[dateArg];

      if (result) {
        const formattedResult =
          "```" +
          `Kết quả XSMB ngày ${dateArg}:\n` +
          `Giải ĐB  : ${result[0]}\n` +
          `Giải nhất: ${result[1]}\n` +
          `Giải nhì : ${result[2].split(",").join(" - ")}\n` +
          `Giải ba  : ${result[3].split(",").join(" - ")}\n` +
          `Giải tư  : ${result[4].split(",").join(" - ")}\n` +
          `Giải năm : ${result[5].split(",").join(" - ")}\n` +
          `Giải sáu : ${result[6].split(",").join(" - ")}\n` +
          `Giải bảy : ${result[7].split(",").join(" - ")}` +
          "```";

        sendMessage(client, event, formattedResult);
      } else {
        const message = "```" + `Không tìm thấy kết quả XSMB ngày ${dateArg}.` + "```";
        sendMessage(client, event, message);
      }
    } catch (error) {
      console.error(`Error in xsmb command:`, error);
    }
  },
};
