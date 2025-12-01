const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

// Listar todos os usuários
exports.getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

// Buscar usuário por ID
exports.getUsuarioById = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
};

// Criar novo usuário
exports.createUsuario = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.senha, 10);
  await Usuario.create({ ...req.body, senha: hashedPassword });
  res.status(201).json({ sucesso: true, message: 'Usuário criado com sucesso!' });
};

// Atualizar usuário
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, tipo } = req.body;

  let dadosAtualizados = { nome, email, tipo };

  if (senha) {
    dadosAtualizados.senha = await bcrypt.hash(senha, 10);
  }

  await Usuario.update(id, dadosAtualizados);
  res.json({ sucesso: true, message: 'Usuário atualizado!' });
};

// Deletar usuário
exports.deleteUsuario = async (req, res) => {
  await Usuario.delete(req.params.id);
  res.json({ sucesso: true, message: 'Usuário deletado!' });
};

// 🔑 Login (sem token)
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findByEmail(email);
  if (!usuario) {
    return res.status(404).json({ sucesso: false, message: 'Usuário não encontrado' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ sucesso: false, message: 'Senha inválida' });
  }

  // ✅ retorna sucesso + dados do usuário
  res.json({
    sucesso: true,
    message: 'Login OK',
    id: usuario.id_usuario,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo
  });
};
