const { Schema, model } = require("mongoose");

module.exports = model(
  "Ticket",
  new Schema({
    GuildID: String,
    TicketID: String,
    ChannelID: String,
    UserID: String,
  })
);
