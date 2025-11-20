const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

// Filtro para aceitar imagens e documentos
const fileFilter = (req, file, cb) => {
  const allowed = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido!'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 20 * 1024 * 1024 } }); // até 20MB

// Upload de um único arquivo
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    message: 'Material enviado com sucesso!',
    file: req.file,
    url: `/uploads/${req.file.filename}`
  });
});

// Upload múltiplo (até 5 arquivos)
router.post('/upload-multi', upload.array('files', 5), (req, res) => {
  const files = req.files.map(file => ({
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    url: `/uploads/${file.filename}`
  }));

  res.json({
    message: 'Materiais enviados com sucesso!',
    files
  });
});

module.exports = router;
