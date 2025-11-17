const ChatMensagem = require('../models/ChatMensagem');

exports.getMensagens = async (req, res) => {
  const mensagens = await ChatMensagem.findAll();
  res.json(mensagens);
};

exports.getMensagemById = async (req, res) => {
  const mensagem = await ChatMensagem.findById(req.params.id);
  res.json(mensagem);
};

exports.createMensagem = async (req, res) => {
  await ChatMensagem.create(req.body);
  res.status(201).send({ message: 'Mensagem enviada!' });
};

exports.updateMensagem = async (req, res) => {
  await ChatMensagem.update(req.params.id, req.body);
  res.send({ message: 'Mensagem atualizada!' });
};

exports.deleteMensagem = async (req, res) => {
  await ChatMensagem.delete(req.params.id);
  res.send({ message: 'Mensagem deletada!' });
};
