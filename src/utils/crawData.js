const path = require("path");
const fs = require("fs");
const axios = require("axios");

const apiUrl =
  "https://apkokwnvt0u4_80.k123b.xyz/api/front/open/lottery/history/low/all/miba?page=1&pageSize=1000&gameCode=miba";

async function crawlData() {
  try {
    const response = await axios.get(apiUrl);
    if (response.data.success) {
      const rows = response.data.rows;
      const outputFilePath = path.join(__dirname, "../data/lottery_data.json");

      const newData = rows.map((row) => {
        const detailArray = JSON.parse(row.detail);
        return {
          [row.turnNum]: detailArray,
        };
      });

      const formattedData = newData.reduce((acc, obj) => {
        const key = Object.keys(obj)[0];
        acc[key] = obj[key];
        return acc;
      }, {});

      await fs.promises.writeFile(outputFilePath, JSON.stringify(formattedData, null, 2));
    } else {
      console.error("Failed to fetch data from API");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = { crawlData };
