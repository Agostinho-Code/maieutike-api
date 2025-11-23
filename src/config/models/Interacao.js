const db = require('../db');

class Interacao {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM interacoes');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM interacoes WHERE id_interacao = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { id_usuario, tipo, descricao } = data;
    const [result] = await db.query(
      'INSERT INTO interacoes (id_usuario, tipo, descricao) VALUES (?, ?, ?)',
      [id_usuario, tipo, descricao]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { descricao, tipo } = data;

    if (descricao !== undefined && tipo !== undefined) {
      await db.query(
        'UPDATE interacoes SET descricao = ?, tipo = ? WHERE id_interacao = ?',
        [descricao, tipo, id]
      );
    } else if (descricao !== undefined) {
      await db.query(
        'UPDATE interacoes SET descricao = ? WHERE id_interacao = ?',
        [descricao, id]
      );
    } else if (tipo !== undefined) {
      await db.query(
        'UPDATE interacoes SET tipo = ? WHERE id_interacao = ?',
        [tipo, id]
      );
    } else {
      throw new Error('Nenhum campo válido para atualizar (use "descricao" e/ou "tipo").');
    }
  }

  static async delete(id) {
    await db.query('DELETE FROM interacoes WHERE id_interacao = ?', [id]);
  }
}

module.exports = Interacao;
