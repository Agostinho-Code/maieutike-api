
const Badge = require('../models/Badge');

exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.findAll();
    res.json(badges);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createBadge = async (req, res) => {
  const { nome, descricao, nivel_minimo } = req.body;

  if (!nome) {
    return res.status(400).json({ success: false, message: "Campo 'nome' é obrigatório" });
  }

  try {
    await Badge.create({ nome, descricao, nivel_minimo });
    res.status(201).json({ success: true, message: 'Badge criada!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBadge = async (req, res) => {
  try {
    await Badge.delete(req.params.id);
    res.json({ success: true, message: 'Badge deletada!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
