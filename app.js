const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./src/config/middleware/errorHandler'); // middleware de erros

const app = express();

// Middlewares globais
app.use(express.json()); // interpreta JSON no body
app.use(cors());         // habilita CORS (acesso de outros domínios)
app.use(helmet());       // segurança extra nos headers

// 🔹 Rota de teste
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Rotas principais
app.use('/usuarios', require('./src/config/routes/usuarioRoutes'));
app.use('/disciplinas', require('./src/config/routes/disciplinaRoutes'));
app.use('/salas', require('./src/config/routes/salaRoutes'));
app.use('/materiais', require('./src/config/routes/materialRoutes'));
app.use('/chat', require('./src/config/routes/chatRoutes'));
app.use('/reputacao', require('./src/config/routes/reputacaoRoutes'));
app.use('/interesses', require('./src/config/routes/interesseRoutes'));
app.use('/badges', require('./src/config/routes/badgeRoutes'));
app.use('/notificacoes', require('./src/config/routes/notificacaoRoutes'));
app.use('/interacoes', require('./src/config/routes/interacaoRoutes'));

// Middleware de tratamento de erros (sempre por último)
app.use(errorHandler);

module.exports = app;
