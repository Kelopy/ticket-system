const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This command is outdated, try again later.",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== "515585079733387266")
      return interaction.reply({
        content: "You don't have permission to execute this command.",
        ephemeral: true,
      });

    const subCommand = interaction.options.getSubcommand(false);
    if (subCommand) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${subCommand}`
      );
      if (!subCommandFile)
        return interaction.reply({
          content: "This sub-command is outdated, try again later.",
          ephemeral: true,
        });
      subCommandFile.execute(interaction, client);
    } else command.execute(interaction, client);
  },
};
