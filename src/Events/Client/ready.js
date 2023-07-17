const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`[LOGGING] Client logged in as '${client.user.username}'`);
    client.user.setActivity(`with ${client.guilds.cache.size} guild(s)`);
    client.user.setStatus("dnd");
    loadCommands(client);
  },
};
