const db = require('../db');


class Notificacao {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM notificacoes');
    return rows;
  }
  

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM notificacoes WHERE id_notificacao = ?', [id]);
    return rows[0];
  }

  static async create(data) {
  const { id_usuario, titulo, mensagem } = data;

  const [result] = await db.query(
    'INSERT INTO notificacoes (id_usuario, mensagem) VALUES (?, ?)',
    [id_usuario, mensagem]
  );

  return result.insertId;
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
