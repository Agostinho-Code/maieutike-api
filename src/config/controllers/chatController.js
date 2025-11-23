const Chat = require('../models/Chat');

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.findAll();
    res.json(chats);
  } catch (error) {
    console.error('Erro ao listar chats:', error);
    res.status(500).json({ message: 'Erro ao listar chats' });
  }
};

exports.getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat não encontrado' });
    }
    res.json(chat);
  } catch (error) {
    console.error(`Erro ao buscar chat ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao buscar chat' });
  }
};

exports.createChat = async (req, res) => {
  const { id_usuario_origem, id_usuario_destino } = req.body;

  if (!id_usuario_origem || !id_usuario_destino) {
    return res.status(400).json({
      message: 'Campos obrigatórios: id_usuario_origem e id_usuario_destino'
    });
  }

  try {
    const id = await Chat.create({ id_usuario_origem, id_usuario_destino });
    res.status(201).json({ message: 'Chat criado com sucesso!', id });
  } catch (error) {
    console.error('Erro ao criar chat:', error);
    res.status(500).json({ message: 'Erro ao criar chat' });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    await Chat.delete(req.params.id);
    res.json({ message: 'Chat deletado!' });
  } catch (error) {
    console.error(`Erro ao deletar chat ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao deletar chat' });
  }
};
