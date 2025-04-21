const { sendMessage } = require("../../utils");
const { crawlData } = require("../../utils/crawData");

module.exports = {
  execute: async (client, event, args) => {
    try {
      await crawlData();
      const helpMessage = "```" + "Thành Công! \n" + "```";
      sendMessage(client, event, helpMessage);
    } catch (error) {
      sendMessage(client, event, "```" + `Không thể lấy được dữ liệu.` + "```");
    }
  },
};
