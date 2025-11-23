const db = require('../db');

class ChatMensagem {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM chat_mensagens');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM chat_mensagens WHERE id_mensagem = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { id_chat, id_usuario, conteudo } = data;
    const [result] = await db.query(
      'INSERT INTO chat_mensagens (id_chat, id_usuario, conteudo) VALUES (?, ?, ?)',
      [id_chat, id_usuario, conteudo]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { conteudo } = data;
    await db.query(
      'UPDATE chat_mensagens SET conteudo = ? WHERE id_mensagem = ?',
      [conteudo, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM chat_mensagens WHERE id_mensagem = ?', [id]);
  }
}

module.exports = ChatMensagem;
