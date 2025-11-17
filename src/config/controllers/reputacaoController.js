const Reputacao = require('../models/Reputacao');

exports.getReputacoes = async (req, res) => {
  const reputacoes = await Reputacao.findAll();
  res.json(reputacoes);
};

exports.getReputacaoByUsuario = async (req, res) => {
  const reputacao = await Reputacao.findByUsuario(req.params.id);
  res.json(reputacao);
};

exports.updateReputacao = async (req, res) => {
  await Reputacao.update(req.params.id, req.body);
  res.send({ message: 'Reputação atualizada!' });
};
