const { loadFiles } = require("../Functions/fileLoader");

async function loadButtons(client) {
  console.time("Buttons Loaded");
  const buttons = new Array();

  const Files = await loadFiles("Buttons");

  Files.forEach((file) => {
    const button = require(file);
    if (!button.id) return;

    client.buttons.set(button.id, button);

    try {
      buttons.push({ Button: button.id, Status: "✅" });
    } catch (error) {
      buttons.push({
        Command: file.split("/").pop().slice(0, -3),
        Status: "🛑",
      });
    }
  });

  return console.table(buttons, ["Button", "Status"]);
}

module.exports = { loadButtons };
