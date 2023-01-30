const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  getCommentsBySpotId(spotId) {
    return this.connection.query(
      `select * from ${this.table} where spot_id = ?`,
      [spotId]
    );
  }
}

module.exports = CommentManager;
