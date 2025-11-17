const Badge = require('../models/Badge');

exports.getBadges = async (req, res) => {
  const badges = await Badge.findAll();
  res.json(badges);
};

exports.createBadge = async (req, res) => {
  await Badge.create(req.body);
  res.status(201).send({ message: 'Badge criada!' });
};

exports.deleteBadge = async (req, res) => {
  await Badge.delete(req.params.id);
  res.send({ message: 'Badge deletada!' });
};
