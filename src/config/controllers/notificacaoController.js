const Notificacao = require('../models/Notificacao');

exports.getNotificacoes = async (req, res) => {
  const notificacoes = await Notificacao.findAll();
  res.json(notificacoes);
};

exports.getNotificacaoById = async (req, res) => {
  const notificacao = await Notificacao.getById(req.params.id);
  if (!notificacao) {
    return res.status(404).json({ message: 'Notificação não encontrada' });
  }
  res.json(notificacao);
};

exports.createNotificacao = async (req, res) => {
  await Notificacao.create(req.body);
  res.status(201).send({ message: 'Notificação criada!' });
};

exports.updateNotificacao = async (req, res) => {
  await Notificacao.update(req.params.id, req.body);
  res.send({ message: 'Notificação atualizada!' });
};

exports.deleteNotificacao = async (req, res) => {
  await Notificacao.delete(req.params.id);
  res.send({ message: 'Notificação deletada!' });
};
