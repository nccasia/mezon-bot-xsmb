const dotenv = require("dotenv");
const { MezonClient } = require("mezon-sdk");
const fs = require("fs");
const path = require("path");
const util = require("util");
dotenv.config();
const readdir = util.promisify(fs.readdir);
const cron = require("node-cron");
const { crawlData } = require("./src/utils/crawData");

const commands = {};

async function loadCommands() {
  const commandFolders = await readdir("./src/commands/");
  for (const folder of commandFolders) {
    const commandFiles = await readdir(`./src/commands/${folder}`);
    for (const file of commandFiles) {
      if (file.endsWith(".js")) {
        const command = require(`./src/commands/${folder}/${file}`);
        const commandName = path.basename(file, ".js");
        commands[commandName] = command;
      }
    }
  }
  console.log("Commands loaded:", Object.keys(commands));
}

async function main() {
  const client = new MezonClient(process.env.APPLICATION_TOKEN);

  await client.authenticate();
  await loadCommands();

  client.on("channel_message", async (event) => {
    const content = event?.content?.t?.trim?.();

    if (content && content.startsWith("*")) {
      const [commandName, ...args] = content.slice(1).split(" ");

      if (commands[commandName]) {
        try {
          await commands[commandName].execute(client, event, args);
        } catch (error) {
          console.error(`Error executing command ${commandName}:`, error);
        }
      } else {
        console.log(`Command ${commandName} not found.`);
      }
    }
  });
  const job = cron.schedule(
    "30 19 * * *",
    () => {
      crawlData();
    },
    {
      timezone: "Asia/Ho_Chi_Minh",
    }
  );
  job.start();
}

main()
  .then(() => {
    console.log("Bot started!");
  })
  .catch((error) => {
    console.error("Error starting bot:", error);
  });
