const Material = require('../models/Material');

exports.getMateriais = async (req, res) => {
  const materiais = await Material.findAll();
  res.json(materiais);
};

exports.getMaterialById = async (req, res) => {
  const material = await Material.findById(req.params.id);
  res.json(material);
};

exports.createMaterial = async (req, res) => {
  await Material.create(req.body);
  res.status(201).send({ message: 'Material criado!' });
};

exports.updateMaterial = async (req, res) => {
  await Material.update(req.params.id, req.body);
  res.send({ message: 'Material atualizado!' });
};

exports.deleteMaterial = async (req, res) => {
  await Material.delete(req.params.id);
  res.send({ message: 'Material deletado!' });
};
