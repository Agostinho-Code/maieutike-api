const db = require('../db');


class ChatMensagem {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM chat_mensagens');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM chat_mensagens WHERE id_mensagem=?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { id_sala, id_usuario, conteudo } = data;
    await db.query(
      'INSERT INTO chat_mensagens (id_sala, id_usuario, conteudo) VALUES (?, ?, ?)',
      [id_sala, id_usuario, conteudo]
    );
  }

  static async update(id, data) {
    const { conteudo } = data;
    await db.query(
      'UPDATE chat_mensagens SET conteudo=? WHERE id_mensagem=?',
      [conteudo, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM chat_mensagens WHERE id_mensagem=?', [id]);
  }
}

module.exports = ChatMensagem;
