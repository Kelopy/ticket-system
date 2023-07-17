const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./Handlers/eventHandler");
const { loadButtons } = require("./Handlers/buttonHandler");
const { loadModals } = require("../src/Handlers/modalHandler");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.subCommands = new Collection();

const { connect, set } = require("mongoose");
set("strictQuery", false);
connect(client.config.database, {}).then(() =>
  console.log("[LOGGING] Connected to the database.")
);

loadEvents(client);
loadButtons(client);
loadModals(client);

client.login(client.config.token);
