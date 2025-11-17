const db = require('../db');


class Interesse {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM interesses');
    return rows;
  }

  static async create(data) {
    const { nome } = data;
    await db.query('INSERT INTO interesses (nome) VALUES (?)', [nome]);
  }

  static async delete(id) {
    await db.query('DELETE FROM interesses WHERE id_interesse=?', [id]);
  }
}

module.exports = Interesse;
