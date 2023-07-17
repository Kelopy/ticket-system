const { loadFiles } = require("../Functions/fileLoader");

async function loadModals(client) {
  console.time("Modals Loaded");
  const modals = new Array();

  const Files = await loadFiles("Modals");

  Files.forEach((file) => {
    const modal = require(file);
    if (!modal.id) return;

    client.modals.set(modal.id, modal);

    try {
      modals.push({ Modal: modal.id, Status: "✅" });
    } catch (error) {
      modals.push({
        Modal: file.split("/").pop().slice(0, -3),
        Status: "🛑",
      });
    }
  });

  return console.table(modals, ["Modal", "Status"]);
}

module.exports = { loadModals };
