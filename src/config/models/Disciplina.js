const db = require('../db');


class Disciplina {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM disciplinas');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM disciplinas WHERE id_disciplina=?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { nome, descricao, id_professor } = data;
    await db.query(
      'INSERT INTO disciplinas (nome, descricao, id_professor) VALUES (?, ?, ?)',
      [nome, descricao, id_professor]
    );
  }

  static async update(id, data) {
    const { nome, descricao, id_professor } = data;
    await db.query(
      'UPDATE disciplinas SET nome=?, descricao=?, id_professor=? WHERE id_disciplina=?',
      [nome, descricao, id_professor, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM disciplinas WHERE id_disciplina=?', [id]);
  }
}

module.exports = Disciplina;
