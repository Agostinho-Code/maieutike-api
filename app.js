const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');


const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(helmet());

// 🔹 Rota de teste
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Rotas principais
app.use('/usuarios', require('./src/config/routes/usuarioRoutes'));
app.use('/disciplinas', require('./src/config/routes/disciplinaRoutes'));
app.use('/salas', require('./src/config/routes/salaRoutes'));
app.use('/materiais', require('./src/config/routes/materialRoutes')); // aqui ficam as rotas de upload
app.use('/chat', require('./src/config/routes/chatRoutes'));
app.use('/chat-mensagens', require('./src/config/routes/chatMensagemRoutes'));
app.use('/reputacao', require('./src/config/routes/reputacaoRoutes'));
app.use('/interesses', require('./src/config/routes/interesseRoutes'));
app.use('/badges', require('./src/config/routes/badgeRoutes'));
app.use('/notificacoes', require('./src/config/routes/notificacaoRoutes'));
app.use('/interacoes', require('./src/config/routes/interacaoRoutes'));

// 🔹 Garantir que a pasta uploads existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(uploadDir));




module.exports = app;
