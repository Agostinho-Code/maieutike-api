const db = require('../db');


class Material {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM materiais');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM materiais WHERE id_material=?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { titulo, tipo, arquivo_url, id_sala, id_autor } = data;
    await db.query(
      'INSERT INTO materiais (titulo, tipo, arquivo_url, id_sala, id_autor) VALUES (?, ?, ?, ?, ?)',
      [titulo, tipo, arquivo_url, id_sala, id_autor]
    );
  }

  static async update(id, data) {
    const { titulo, tipo, arquivo_url, id_sala, id_autor } = data;
    await db.query(
      'UPDATE materiais SET titulo=?, tipo=?, arquivo_url=?, id_sala=?, id_autor=? WHERE id_material=?',
      [titulo, tipo, arquivo_url, id_sala, id_autor, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM materiais WHERE id_material=?', [id]);
  }
}

module.exports = Material;
