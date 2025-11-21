const pool = require('../db'); // importa a pool de conexão configurada

class Badge {
  // Buscar todos os badges
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM badges');
    return rows;
  }

  // Criar um novo badge
  static async create({ nome, descricao, nivel_minimo }) {
    const [result] = await pool.query(
      'INSERT INTO badges (nome, descricao, nivel_minimo) VALUES (?, ?, ?)',
      [nome, descricao, nivel_minimo]
    );
    return result.insertId;
  }

  // Deletar um badge pelo ID
  static async delete(id) {
    await pool.query('DELETE FROM badges WHERE id_badge = ?', [id]);
  }
}

module.exports = Badge;
