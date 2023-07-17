const {
  ChatInputCommandInteraction,
  ChannelType,
  PermissionsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const database = require("../../Schemas/TicketSetup");
const tktdatabase = require("../../Schemas/Ticket");

module.exports = {
  id: "open-ticket",
  developer: false,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { guild, user, member, channel } = interaction;

    const reason = interaction.fields.getTextInputValue("reason-text");

    let ticketData = await tktdatabase.findOne({
      GuildID: guild.id,
      ChannelID: channel.id,
      UserID: member.id,
    });

    async function ticketsDataCheck(data, channel_id) {
      if (!data) {
        const ticket = await tktdatabase.create({
          GuildID: guild.id,
          TicketID: `ticket-${user.username}`,
          ChannelID: channel_id,
          UserID: member.id,
        });

        ticket.save();
      }
    }

    let setupData = await database.findOne({ GuildID: guild.id });
    const support_role = guild.roles.cache.get(setupData.SupportRoleID);

    let tickets_category = guild.channels.cache.find(
      (c) => c.type == ChannelType.GuildCategory && c.name == "Tickets"
    );

    let user_ticket = guild.channels.cache.find(
      (c) =>
        c.type == ChannelType.GuildText && c.name == `ticket-${user.username}`
    );

    if (!tickets_category && !user_ticket) {
      tickets_category = await guild.channels.create({
        name: "Tickets",
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: support_role.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });
      user_ticket = await interaction.guild.channels.create({
        name: `ticket-${user.username}`,
        type: ChannelType.GuildText,
        parent: tickets_category,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: support_role.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });

      ticketsDataCheck(ticketData, user_ticket.id);
    } else if (tickets_category && !user_ticket) {
      user_ticket = await interaction.guild.channels.create({
        name: `ticket-${user.username}`,
        type: ChannelType.GuildText,
        parent: tickets_category,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: support_role.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });

      ticketsDataCheck(ticketData, user_ticket.id);
    } else {
      return interaction.reply({
        content: `🛑 | You already have an open ticket, you're unable to open another.`,
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Ticket`)
      .addFields({ name: "Reason", value: reason })
      .setColor("Green");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("close-ticket")
        .setLabel("Close Ticket")
        .setStyle(ButtonStyle.Danger)
    );

    await user_ticket.send({
      content: `${member} ${support_role}`,
      embeds: [embed],
      components: [row],
    });

    return interaction.reply({
      content: `✅ | Your ticket has been successfully created in: ${user_ticket}`,
      ephemeral: true,
    });
  },
};
