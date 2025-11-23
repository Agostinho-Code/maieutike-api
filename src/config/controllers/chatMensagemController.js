const ChatMensagem = require('../models/ChatMensagem');

exports.getMensagens = async (req, res) => {
  try {
    const mensagens = await ChatMensagem.findAll();
    res.json(mensagens);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ message: 'Erro ao buscar mensagens' });
  }
};

exports.getMensagemById = async (req, res) => {
  try {
    const mensagem = await ChatMensagem.findById(req.params.id);
    if (!mensagem) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }
    res.json(mensagem);
  } catch (error) {
    console.error('Erro ao buscar mensagem:', error);
    res.status(500).json({ message: 'Erro ao buscar mensagem' });
  }
};

exports.createMensagem = async (req, res) => {
  const { id_chat, id_usuario, conteudo } = req.body;

  if (!id_chat || !id_usuario || !conteudo) {
    return res.status(400).json({
      message: 'Campos obrigatórios: id_chat, id_usuario, conteudo'
    });
  }

  try {
    const id = await ChatMensagem.create({ id_chat, id_usuario, conteudo });
    res.status(201).json({ message: 'Mensagem enviada!', id });
  } catch (error) {
    console.error('Erro ao criar mensagem:', error);
    res.status(500).json({ message: 'Erro ao criar mensagem' });
  }
};

exports.updateMensagem = async (req, res) => {
  const { conteudo } = req.body;

  if (!conteudo) {
    return res.status(400).json({ message: 'Campo "conteudo" é obrigatório para atualização' });
  }

  try {
    await ChatMensagem.update(req.params.id, { conteudo });
    res.json({ message: 'Mensagem atualizada!' });
  } catch (error) {
    console.error('Erro ao atualizar mensagem:', error);
    res.status(500).json({ message: 'Erro ao atualizar mensagem' });
  }
};

exports.deleteMensagem = async (req, res) => {
  try {
    await ChatMensagem.delete(req.params.id);
    res.json({ message: 'Mensagem deletada!' });
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error);
    res.status(500).json({ message: 'Erro ao deletar mensagem' });
  }
};
