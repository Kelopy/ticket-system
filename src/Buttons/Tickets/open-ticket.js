const {
  ChatInputCommandInteraction,
  ActionRowBuilder,
  TextInputStyle,
  ModalBuilder,
  TextInputBuilder,
} = require("discord.js");

module.exports = {
  id: "open-ticket",
  developer: false,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("open-ticket")
      .setTitle("Open a General Support Ticket");

    const reasonRow = new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("reason-text")
        .setLabel(`Reason for opening this ticket`)
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(250)
    );

    modal.addComponents(reasonRow);
    return await interaction.showModal(modal);
  },
};
