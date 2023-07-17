const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("reload your commands/events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addSubcommand((options) =>
      options.setName("events").setDescription("reload your events")
    )
    .addSubcommand((options) =>
      options.setName("commands").setDescription("reload your commands")
    )
    .addSubcommand((options) =>
      options.setName("buttons").setDescription("reload your buttons")
    ),
};
