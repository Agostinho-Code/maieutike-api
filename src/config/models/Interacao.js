const db = require('../db');

class Interacao {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM interacoes');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM interacoes WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { usuario_id, mensagem } = data;
    const [result] = await db.query(
      'INSERT INTO interacoes (usuario_id, mensagem) VALUES (?, ?)',
      [usuario_id, mensagem]
    );
    return { id: result.insertId, usuario_id, mensagem };
  }

  static async update(id, data) {
    const { mensagem } = data;
    await db.query('UPDATE interacoes SET mensagem = ? WHERE id = ?', [mensagem, id]);
    return { id, mensagem };
  }

  static async delete(id) {
    await db.query('DELETE FROM interacoes WHERE id = ?', [id]);
  }
}

module.exports = Interacao;
