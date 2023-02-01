const AbstractManager = require("./AbstractManager");

class SpotVisited extends AbstractManager {
  constructor() {
    super({ table: "spot_visited" });
  }

  getSpotsVisited(idUser) {
    return this.connection.query(
      `select * from ${this.table} 
          join spot on ${this.table}.spot_id = spot.id
          where user_id = ?`,
      [idUser]
    );
  }
}

module.exports = SpotVisited;
