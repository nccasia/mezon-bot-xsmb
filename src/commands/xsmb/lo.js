const fs = require("fs");
const path = require("path");
const { sendMessage } = require("../../utils");

module.exports = {
  execute: async (client, event, args) => {
    try {
      const dateArg = args[0];
      if (!dateArg) {
        return sendMessage(
          client,
          event,
          "```Vui lòng cung cấp ngày theo định dạng: *lo DD/MM/YYYY```"
        );
      }

      const dataFilePath = path.join(__dirname, "../../data/lottery_data.json");
      const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

      const result = data[dateArg];

      if (result) {
        const lo = {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: [],
        };

        result.forEach((prize) => {
          prize.split(",").forEach((number) => {
            const last2Number = number.slice(-2);
            lo[last2Number[0]] = [...lo[last2Number[0]], last2Number];
          });
        });

        let message = "";
        Object.entries(lo).forEach(([firstNumber, arr]) => {
          message += `\n ${firstNumber}  |  ${arr.length ? arr.join(", ") : "-"}`;
        });

        const formattedMessage = `\`\`\`Kết quả Lô miền Bắc ngày ${dateArg}:\nĐầu |  Lô${message}\`\`\``;

        sendMessage(client, event, formattedMessage);
      } else {
        sendMessage(
          client,
          event,
          "```" + `Không tìm thấy kết quả Lô ngày ${dateArg}` + "```"
        );
      }
    } catch (error) {
      console.error(`Error in *lo command:`, error);
    }
  },
};
