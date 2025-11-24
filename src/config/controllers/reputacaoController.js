const Reputacao = require('../models/Reputacao');

// Buscar todas
exports.getReputacoes = async (req, res) => {
  const reputacoes = await Reputacao.findAll();
  res.json(reputacoes);
};

// Buscar por usuário
exports.getReputacaoByUsuario = async (req, res) => {
  const reputacao = await Reputacao.findByUsuario(req.params.id_usuario);
  if (!reputacao) {
    return res.status(404).json({ message: 'Reputação não encontrada' });
  }
  res.json(reputacao);
};

// Criar reputação
exports.createReputacao = async (req, res) => {
  const { id_usuario, pontos, nivel, badge_atual } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ message: 'Campo "id_usuario" é obrigatório' });
  }

  try {
    const id = await Reputacao.create({ id_usuario, pontos, nivel, badge_atual });
    res.status(201).json({ message: 'Reputação criada com sucesso!', id });
  } catch (error) {
    console.error('Erro ao criar reputação:', error);
    res.status(500).json({ message: 'Erro ao criar reputação' });
  }
};


// Atualizar reputação
exports.updateReputacao = async (req, res) => {
  try {
    await Reputacao.update(req.params.id_usuario, req.body);
    res.json({ message: 'Reputação atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar reputação:', error);
    res.status(500).json({ message: 'Erro ao atualizar reputação' });
  }
};
exports.deleteReputacao = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    await Reputacao.delete(id_usuario);
    res.json({ message: 'Reputação deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar reputação:', error.message);
    res.status(500).json({ message: 'Erro ao deletar reputação' });
  }
};
