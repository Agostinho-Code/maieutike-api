// Middleware global de tratamento de erros
function errorHandler(err, req, res, next) {
  console.error(err.stack); // mostra o erro no console para debug

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno no servidor',
  });
}

module.exports = errorHandler;
