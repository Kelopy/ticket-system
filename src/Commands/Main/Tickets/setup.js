const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

const database = require("../../../Schemas/TicketSetup");

module.exports = {
  subCommand: "ticket.setup",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, guild } = interaction;

    const ticket_channel = options.getChannel("ticket-channel");
    const transcripts_channel = options.getChannel("transcripts-channel");
    const support_role = options.getRole("support-role");

    let setupData = await database.findOne({ GuildID: guild.id });
    if (!setupData) {
      setupData = await database.create({
        GuildID: guild.id,
        TicketsChannelID: transcripts_channel.id,
        TranscriptsChannelID: ticket_channel.id,
        SupportRoleID: support_role.id,
      });
    } else {
      setupData.TicketsChannelID = ticket_channel.id;
      setupData.TranscriptsChannelID = transcripts_channel.id;
      setupData.SupportRoleID = support_role.id;
      await setupData.save();
    }

    const embed = new EmbedBuilder()
      .setTitle("Tickets & Support")
      .setDescription("Click the button below to open a ticket.")
      .setColor("Blue");

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Create a General Support Ticket")
        .setEmoji("🎫")
        .setCustomId("open-ticket")
        .setStyle(ButtonStyle.Secondary)
    );

    ticket_channel.send({ embeds: [embed], components: [buttons] });

    return interaction.reply({
      content: `✅ | Successfully setup the ticket system in: ${ticket_channel}`,
      ephemeral: true,
    });
  },
};
