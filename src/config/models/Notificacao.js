const db = require('../db');


class Notificacao {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM notificacoes');
    return rows;
  }

  static async create(data) {
    const { id_usuario, mensagem } = data;
    await db.query(
      'INSERT INTO notificacoes (id_usuario, mensagem) VALUES (?, ?)',
      [id_usuario, mensagem]
    );
  }

  static async update(id, data) {
    const { lida } = data;
    await db.query('UPDATE notificacoes SET lida=? WHERE id_notificacao=?', [lida, id]);
  }

  static async delete(id) {
    await db.query('DELETE FROM notificacoes WHERE id_notificacao=?', [id]);
  }
}

module.exports = Notificacao;
