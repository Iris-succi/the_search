const AbstractManager = require("./AbstractManager");

class SessionManager extends AbstractManager {
  constructor() {
    super({ table: "session" });
  }

  getSessions(userId) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }

  add(session) {
    return this.connection.query(
      `INSERT INTO ${this.table} (user_id, name_spot, board, conditions, date, content, picture) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        session.user_id,
        session.name_spot,
        session.board,
        session.conditions,
        session.date,
        session.content,
        session.picture,
      ]
    );
  }
}

module.exports = SessionManager;
