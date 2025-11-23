const db = require('../db');

class Chat {
  static async findAll() {
    try {
      const [rows] = await db.query('SELECT * FROM chats');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar todos os chats:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM chats WHERE id_chat = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar o chat com ID ${id}:`, error);
      throw error;
    }
  }

  static async create(data) {
    const { id_usuario_origem, id_usuario_destino } = data;

    if (!id_usuario_origem || !id_usuario_destino) {
      throw new Error('Campos obrigatórios: id_usuario_origem e id_usuario_destino');
    }

    try {
      const [result] = await db.query(
        'INSERT INTO chats (id_usuario_origem, id_usuario_destino) VALUES (?, ?)',
        [id_usuario_origem, id_usuario_destino]
      );
      return result.insertId;
    } catch (error) {
      console.error('Erro ao criar chat:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await db.query('DELETE FROM chats WHERE id_chat = ?', [id]);
    } catch (error) {
      console.error(`Erro ao deletar o chat com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Chat;
