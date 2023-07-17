const { Schema, model } = require("mongoose");

module.exports = model(
  "TicketSetup",
  new Schema({
    GuildID: String,
    TicketsChannelID: String,
    TranscriptsChannelID: String,
    SupportRoleID: String,
  })
);
