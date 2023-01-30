const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  getCommentsBySpotId(spotId) {
    return this.connection.query(
      `select * from ${this.table}
      join user on ${this.table}.user_id = user.id
      where spot_id = ?`,
      [spotId]
    );
  }
}

module.exports = CommentManager;
