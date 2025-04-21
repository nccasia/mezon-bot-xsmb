const fs = require("fs");
const path = require("path");
const { sendMessage } = require("../../utils");
const poeticVerses = require("../../constants/constants");

module.exports = {
  execute: async (client, event, args) => {
    try {
      const numberToCheck = args[0];
      if (!numberToCheck || isNaN(numberToCheck) || numberToCheck.length > 2) {
        return sendMessage(client, event, "```*thongke XX```");
      }

      const dataFilePath = path.join(__dirname, "../../data/lottery_data.json");
      const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const targetNumber = numberToCheck.padStart(2, "0");
      const verse = poeticVerses[parseInt(targetNumber)];

      const filteredData = Object.entries(data).filter(([date]) => {
        const [, month, year] = date.split("/").map(Number);
        return month === currentMonth && year === currentYear;
      });

      let count = 0,
        maxMissDays = 0,
        currentMissDays = 0;
      let lastWinDateIndex = -1,
        totalInterval = 0;

      filteredData.forEach(([_, prizes], index) => {
        const isPresent = prizes.some((prize) =>
          prize
            .split(",")
            .some((prizeNumber) => prizeNumber.trim().slice(-2) === targetNumber)
        );

        if (isPresent) {
          count++;
          if (lastWinDateIndex >= 0) {
            totalInterval += index - lastWinDateIndex;
          }
          lastWinDateIndex = index;
          maxMissDays = Math.max(maxMissDays, currentMissDays);
          currentMissDays = 0;
        } else {
          currentMissDays++;
        }
      });

      maxMissDays = Math.max(maxMissDays, currentMissDays);

      const formattedResult =
        "```" +
        verse +
        "\n" +
        "Thống kê cho số " +
        targetNumber +
        " trong tháng " +
        currentMonth +
        "/" +
        currentYear +
        ":\n" +
        "- Số lần về trong tháng: " +
        count +
        " lần.\n" +
        "- Chuỗi ngày không về dài nhất: " +
        maxMissDays +
        " ngày.\n" +
        "```";

      sendMessage(client, event, formattedResult);
    } catch (error) {
      sendMessage(
        client,
        event,
        "```" + `Không tìm thấy kết quả cho số ${args[0]}.` + "```"
      );
    }
  },
};
