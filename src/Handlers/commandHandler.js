const { loadFiles } = require("../Functions/fileLoader");

async function loadCommands(client) {
  console.time("Commands Loaded");
  const commands = new Array();

  await client.commands.clear();
  await client.subCommands.clear();

  let commandsArray = [];

  const Files = await loadFiles("Commands");

  Files.forEach((file) => {
    const command = require(file);

    if (command.subCommand)
      return client.subCommands.set(command.subCommand, command);

    client.commands.set(command.data.name, command);

    commandsArray.push(command.data.toJSON());

    try {
      commands.push({ Command: command.data.name, Status: "✅" });
    } catch (error) {
      commands.push({
        Command: file.split("/").pop().slice(0, -3),
        Status: "🛑",
      });
    }
  });

  client.application.commands.set(commandsArray);
  return console.table(commands, ["Command", "Status"]);
}

module.exports = { loadCommands };
