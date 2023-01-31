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

  insertComment(comment) {
    return this.connection.query(
      `INSERT into ${this.table} (comment, note, user_id, spot_id) values ( ?, ?, ?, ?)`,
      [comment.comment, comment.note, comment.user_id, comment.spot_id]
    );
  }
}

module.exports = CommentManager;
