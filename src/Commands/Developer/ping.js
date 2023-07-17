const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const ping = Math.round(client.ws.ping);

    interaction.reply({
      content: `**Latency**: \`${ping}ms\``,
      ephemeral: true,
    });
  },
};
