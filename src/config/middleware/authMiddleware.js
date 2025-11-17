const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'segredo_super_seguro'); 
    req.userId = decoded.id; // guarda o ID do usuário no request
    next(); // segue para o controller
  } catch (err) {
    return res.status(401).send({ message: 'Token inválido' });
  }
};
