const db = require('../db');


class Badge {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM badges');
    return rows;
  }

  static async create(data) {
    const { nome, descricao, nivel_minimo } = data;
    await db.query(
      'INSERT INTO badges (nome, descricao, nivel_minimo) VALUES (?, ?, ?)',
      [nome, descricao, nivel_minimo]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM badges WHERE id_badge=?', [id]);
  }
}

module.exports = Badge;
