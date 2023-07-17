const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("ticket system")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addSubcommand((options) =>
      options
        .setName("setup")
        .setDescription("setup the ticket system")
        .addChannelOption((options) =>
          options
            .setName("ticket-channel")
            .setDescription("where users are able to open a ticket")
            .setRequired(true)
        )
        .addChannelOption((options) =>
          options
            .setName("transcripts-channel")
            .setDescription("where channel transcripts are logged")
            .setRequired(true)
        )
        .addRoleOption((options) =>
          options
            .setName("support-role")
            .setDescription("role that's able to handle tickets")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options.setName("close").setDescription("close the ticket you're in")
    ),
};
