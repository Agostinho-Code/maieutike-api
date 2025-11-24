const db = require('../db');

class Reputacao {
  // Buscar todas as reputações
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM reputacao');
    return rows;
  }

  // Buscar reputação de um usuário específico
  static async findByUsuario(id_usuario) {
    const [rows] = await db.query('SELECT * FROM reputacao WHERE id_usuario = ?', [id_usuario]);
    return rows[0];
  }

  // Criar reputação inicial
  static async create(data) {
    const { id_usuario, pontos = 0, nivel = 'Iniciante', badge_atual = null } = data;
    const [result] = await db.query(
      'INSERT INTO reputacao (id_usuario, pontos, nivel, badge_atual) VALUES (?, ?, ?, ?)',
      [id_usuario, pontos, nivel, badge_atual]
    );
    return result.insertId;
  }

  static async delete(id_usuario) {
  await db.query('DELETE FROM reputacao WHERE id_usuario = ?', [id_usuario]);
}


  // Atualizar reputação de um usuário
  static async update(id_usuario, data) {
    const { pontos, nivel, badge_atual } = data;

    const updates = [];
    const values = [];

    if (pontos !== undefined) {
      updates.push('pontos = ?');
      values.push(pontos);
    }
    if (nivel !== undefined) {
      updates.push('nivel = ?');
      values.push(nivel);
    }
    if (badge_atual !== undefined) {
      updates.push('badge_atual = ?');
      values.push(badge_atual);
    }

    if (updates.length === 0) {
      throw new Error('Nenhum campo válido para atualizar');
    }

    values.push(id_usuario);

    const sql = `UPDATE reputacao SET ${updates.join(', ')} WHERE id_usuario = ?`;
    await db.query(sql, values);
  }
}

module.exports = Reputacao;
