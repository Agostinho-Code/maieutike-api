const db = require('../db');


class SalaVirtual {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM salas_virtuais');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM salas_virtuais WHERE id_sala=?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { nome, descricao, codigo_acesso, id_disciplina } = data;
    await db.query(
      'INSERT INTO salas_virtuais (nome, descricao, codigo_acesso, id_disciplina) VALUES (?, ?, ?, ?)',
      [nome, descricao, codigo_acesso, id_disciplina]
    );
  }

  static async update(id, data) {
    const { nome, descricao, codigo_acesso, id_disciplina } = data;
    await db.query(
      'UPDATE salas_virtuais SET nome=?, descricao=?, codigo_acesso=?, id_disciplina=? WHERE id_sala=?',
      [nome, descricao, codigo_acesso, id_disciplina, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM salas_virtuais WHERE id_sala=?', [id]);
  }
}

module.exports = SalaVirtual;
