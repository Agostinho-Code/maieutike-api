const Interacao = require('../models/Interacao');

// Buscar todas as interações
exports.getInteracoes = async (req, res, next) => {
  try {
    const interacoes = await Interacao.getAll();
    res.json(interacoes);
  } catch (error) {
    next(error);
  }
};

exports.getInteracaoById = async (req, res) => {
  try {
    const interacao = await Interacao.getById(req.params.id);
    if (!interacao) {
      return res.status(404).json({ message: 'Interação não encontrada' });
    }
    res.json(interacao);
  } catch (error) {
    console.error('Erro ao buscar interação:', error);
    res.status(500).json({ message: 'Erro ao buscar interação' });
  }
};

// Criar nova interação
exports.createInteracao = async (req, res, next) => {
  try {
    const novaInteracaoId = await Interacao.create(req.body);
    res.status(201).json({ message: 'Interação criada com sucesso!', id: novaInteracaoId });
  } catch (error) {
    next(error);
  }
};

// Atualizar interação
exports.updateInteracao = async (req, res, next) => {
  try {
    await Interacao.update(req.params.id, req.body);
    res.json({ message: 'Interação atualizada com sucesso!' });
  } catch (error) {
    next(error);
  }
};

// Deletar interação
exports.deleteInteracao = async (req, res, next) => {
  try {
    await Interacao.delete(req.params.id);
    res.json({ message: 'Interação deletada com sucesso!' });
  } catch (error) {
    next(error);
  }
};
