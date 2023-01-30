const AbstractManager = require("./AbstractManager");

class SpotManager extends AbstractManager {
  constructor() {
    super({ table: "spot" });
  }
}

module.exports = SpotManager;
