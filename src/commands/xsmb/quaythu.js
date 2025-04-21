const { sendMessage } = require("../../utils");

function generateRandomNumber(digits) {
  return Math.floor(Math.random() * Math.pow(10, digits))
    .toString()
    .padStart(digits, "0");
}

function generateLotteryResults() {
  return {
    "Giải ĐB  ": [generateRandomNumber(5)],
    "Giải nhất": [generateRandomNumber(5)],
    "Giải nhì ": Array.from({ length: 2 }, () => generateRandomNumber(5)),
    "Giải ba  ": Array.from({ length: 6 }, () => generateRandomNumber(5)),
    "Giải tư  ": Array.from({ length: 4 }, () => generateRandomNumber(4)),
    "Giải năm ": Array.from({ length: 6 }, () => generateRandomNumber(4)),
    "Giải sáu ": Array.from({ length: 3 }, () => generateRandomNumber(3)),
    "Giải bảy ": Array.from({ length: 4 }, () => generateRandomNumber(2)),
  };
}

function formatLotteryResults(results) {
  return Object.entries(results)
    .map(([prize, numbers]) => `${prize}: ${numbers.join(", ")}`)
    .join("\n");
}

module.exports = {
  execute: async (client, event, args) => {
    try {
      const results = generateLotteryResults();
      const formattedResults = formatLotteryResults(results);
      const formattedMessages = "```Kết quả quay thử XSMB\n" + formattedResults + "```";
      sendMessage(client, event, formattedMessages);
    } catch (error) {
      console.error(`Error in *quaythu command:`, error);
    }
  },
};
