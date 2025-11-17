const Interesse = require('../models/Interesse');

exports.getInteresses = async (req, res) => {
  const interesses = await Interesse.findAll();
  res.json(interesses);
};

exports.createInteresse = async (req, res) => {
  await Interesse.create(req.body);
  res.status(201).send({ message: 'Interesse criado!' });
};

exports.deleteInteresse = async (req, res) => {
  await Interesse.delete(req.params.id);
  res.send({ message: 'Interesse deletado!' });
};
