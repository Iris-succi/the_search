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

  addSpotVisited(spot) {
    return this.connection.query(
      `insert into ${this.table} (user_id, spot_id) values (?, ?)`,
      [spot.user_id, spot.spot_id]
    );
  }
}

module.exports = SpotVisited;
