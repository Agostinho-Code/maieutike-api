const Disciplina = require('../models/Disciplina');

exports.getDisciplinas = async (req, res) => {
  const disciplinas = await Disciplina.findAll();
  res.json(disciplinas);
};

exports.getDisciplinaById = async (req, res) => {
  const disciplina = await Disciplina.findById(req.params.id);
  res.json(disciplina);
};

exports.createDisciplina = async (req, res) => {
  await Disciplina.create(req.body);
  res.status(201).send({ message: 'Disciplina criada!' });
};

exports.updateDisciplina = async (req, res) => {
  await Disciplina.update(req.params.id, req.body);
  res.send({ message: 'Disciplina atualizada!' });
};

exports.deleteDisciplina = async (req, res) => {
  await Disciplina.delete(req.params.id);
  res.send({ message: 'Disciplina deletada!' });
};
