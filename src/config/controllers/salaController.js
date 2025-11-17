const SalaVirtual = require('../models/SalaVirtual');

exports.getSalas = async (req, res) => {
  const salas = await SalaVirtual.findAll();
  res.json(salas);
};

exports.getSalaById = async (req, res) => {
  const sala = await SalaVirtual.findById(req.params.id);
  res.json(sala);
};

exports.createSala = async (req, res) => {
  await SalaVirtual.create(req.body);
  res.status(201).send({ message: 'Sala criada!' });
};

exports.updateSala = async (req, res) => {
  await SalaVirtual.update(req.params.id, req.body);
  res.send({ message: 'Sala atualizada!' });
};

exports.deleteSala = async (req, res) => {
  await SalaVirtual.delete(req.params.id);
  res.send({ message: 'Sala deletada!' });
};
