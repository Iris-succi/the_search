const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "favorite" });
  }

  insert(favorite) {
    return this.connection.query(
      `insert into ${this.table} (user_id, spot_id) values (?, ?)`,
      [favorite.user_id, favorite.spot_id]
    );
  }

  getFavorites(idUser) {
    return this.connection.query(
      `select * from ${this.table} 
      join spot on ${this.table}.spot_id = spot.id
      where user_id = ?`,
      [idUser]
    );
  }
}

module.exports = FavoriteManager;
