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

// Buscar uma interação por ID
exports.getInteracaoById = async (req, res, next) => {
  try {
    const interacao = await Interacao.getById(req.params.id);
    if (!interacao) {
      return res.status(404).json({ message: 'Interação não encontrada' });
    }
    res.json(interacao);
  } catch (error) {
    next(error);
  }
};

// Criar nova interação
exports.createInteracao = async (req, res, next) => {
  try {
    const novaInteracao = await Interacao.create(req.body);
    res.status(201).json(novaInteracao);
  } catch (error) {
    next(error);
  }
};

// Atualizar interação
exports.updateInteracao = async (req, res, next) => {
  try {
    const atualizada = await Interacao.update(req.params.id, req.body);
    res.json(atualizada);
  } catch (error) {
    next(error);
  }
};

// Deletar interação
exports.deleteInteracao = async (req, res, next) => {
  try {
    await Interacao.delete(req.params.id);
    res.json({ message: 'Interação deletada com sucesso' });
  } catch (error) {
    next(error);
  }
};
