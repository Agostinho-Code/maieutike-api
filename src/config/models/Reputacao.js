const db = require('../db');


class Reputacao {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM reputacao');
    return rows;
  }

  static async findByUsuario(id_usuario) {
    const [rows] = await db.query('SELECT * FROM reputacao WHERE id_usuario=?', [id_usuario]);
    return rows[0];
  }

  static async update(id_usuario, data) {
    const { pontos, nivel, badge_atual } = data;
    await db.query(
      'UPDATE reputacao SET pontos=?, nivel=?, badge_atual=? WHERE id_usuario=?',
      [pontos, nivel, badge_atual, id_usuario]
    );
  }
}

module.exports = Reputacao;
