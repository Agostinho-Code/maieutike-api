const db = require('../db');


class Usuario {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id_usuario= ?', [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email=?', [email]);
    return rows[0];
  }

  static async create(data) {
    const { nome, email, senha, tipo } = data;
    await db.query(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, senha, tipo]
    );
  }

  static async update(id, data) {
    const { nome, email, senha, tipo } = data;
    await db.query(
      'UPDATE usuarios SET nome=?, email=?, senha=?, tipo=? WHERE id_usuario=?',
      [nome, email, senha, tipo, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM usuarios WHERE id_usuario=?', [id]);
  }
}

module.exports = Usuario;

