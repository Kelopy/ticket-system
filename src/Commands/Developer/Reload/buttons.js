const { ChatInputCommandInteraction, Client } = require("discord.js");
const { loadButtons } = require("../../../Handlers/buttonHandler");

module.exports = {
  subCommand: "reload.buttons",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    loadButtons(client);
    interaction.reply({
      content: "✅ | Successfully reloaded all buttons.",
      ephemeral: true,
    });
  },
};
