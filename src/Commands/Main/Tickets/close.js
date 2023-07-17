const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

const Transcripts = require("discord-html-transcripts");
const database = require("../../../Schemas/TicketSetup");
const tktdatabase = require("../../../Schemas/Ticket");

module.exports = {
  subCommand: "ticket.close",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { channel, guild, user } = interaction;

    let setupData = await database.findOne({ GuildID: guild.id });
    if (!setupData)
      return interaction.reply({
        content: "🛑 | This server doesn't have a ticket system setup.",
        ephemeral: true,
      });

    let ticketsData = await tktdatabase.findOne({ GuildID: guild.id });
    if (!ticketsData)
      return interaction.reply({
        content:
          "🛑 | This server doesn't have any tickets in the first place ;p",
        ephemeral: true,
      });

    let ticketData = await tktdatabase.findOne({
      GuildID: guild.id,
      ChannelID: channel.id,
    });

    if (!ticketData) {
      return interaction.reply({
        content:
          "🛑 | You're not inside a ticket, or it doesn't exist in the database.",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Transcript for **${ticketData.TicketID}**`)
      .setFooter({ text: `Ticket closed by ${user.username}` })
      .setTimestamp();

    const transcript = await Transcripts.createTranscript(channel);
    const transcripts_channel = interaction.guild.channels.cache.get(
      setupData.TranscriptsChannelID
    );

    if (!transcripts_channel) {
      return interaction.reply({
        content:
          "🛑 | Transcripts channel doesn't exist, unable to close ticket.",
        ephemeral: true,
      });
    }

    await transcripts_channel.send({
      embeds: [embed],
      files: [transcript],
    });

    await tktdatabase.deleteOne({
      ChannelID: channel.id,
    });

    channel.delete();
  },
};
