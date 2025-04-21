const { sendMessage } = require("../../utils");

module.exports = {
  execute: async (client, event, args) => {
    try {
      const helpMessage =
        "```" +
        "XSMB - Help Menu: \n" +
        "- xsmb [DD/MM/YYYY]: xem kết quả xổ số miền Bắc vào ngày DD/MM/YYYY \n" +
        "- lo [DD/MM/YYYY]: xem kết quả lô vào ngày DD/MM/YYYY \n" +
        "- thongke [number]: xem thông kê cho số đó trong tháng này \n" +
        "- quaythu: quay thử kết quả xổ số miền Bắc \n" +
        "```";
      sendMessage(client, event, helpMessage);
    } catch (error) {
      console.error(error);
    }
  },
};
