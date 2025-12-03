const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// 🔹 Simulação de "banco de dados" em memória
let materiais = [
  { id: 1, titulo: 'Material inicial', descricao: 'Exemplo de material', arquivos: [] }
];

// 🔹 Configuração do upload
const uploadDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '-' + safeName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error('Tipo de arquivo não permitido!'), false);
};

const upload = multer({ storage, fileFilter });

/* ---------------- ROTAS CRUD ---------------- */

// Listar todos os materiais
router.get('/', (req, res) => {
  res.json(materiais);
});

// Obter um material específico
router.get('/:id', (req, res) => {
  const material = materiais.find(m => m.id === parseInt(req.params.id));
  if (!material) {
    return res.status(404).json({ success: false, message: 'Material não encontrado' });
  }
  res.json(material);
});

// Criar um novo material
router.post('/', (req, res) => {
  const novo = {
    id: materiais.length + 1,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    arquivos: []
  };
  materiais.push(novo);
  res.status(201).json({ success: true, message: 'Material criado com sucesso!', material: novo });
});

// Editar um material
router.put('/:id', (req, res) => {
  const material = materiais.find(m => m.id === parseInt(req.params.id));
  if (!material) {
    return res.status(404).json({ success: false, message: 'Material não encontrado' });
  }
  material.titulo = req.body.titulo || material.titulo;
  material.descricao = req.body.descricao || material.descricao;
  res.json({ success: true, message: 'Material atualizado com sucesso!', material });
});

// Apagar um material
router.delete('/:id', (req, res) => {
  const index = materiais.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Material não encontrado' });
  }
  materiais.splice(index, 1);
  res.json({ success: true, message: 'Material removido com sucesso!' });
});

/* ---------------- ROTAS DE UPLOAD ---------------- */

// Upload único vinculado a um material
router.post('/:id/upload', upload.single('file'), (req, res) => {
  const material = materiais.find(m => m.id === parseInt(req.params.id));
  if (!material) {
    return res.status(404).json({ success: false, message: 'Material não encontrado' });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Nenhum arquivo enviado!' });
  }

  const file = {
    id: Date.now(), // 🔹 gera ID único
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    filename: req.file.filename, // 🔹 salva nome físico
    url: `/uploads/${req.file.filename}` // 🔹 link público
  };

  material.arquivos.push(file);

  res.json({ success: true, message: 'Arquivo anexado ao material com sucesso!', file });
});

// Upload múltiplo vinculado a um material
router.post('/:id/upload-multi', upload.array('files', 5), (req, res) => {
  const material = materiais.find(m => m.id === parseInt(req.params.id));
  if (!material) {
    return res.status(404).json({ success: false, message: 'Material não encontrado' });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'Nenhum arquivo enviado!' });
  }

  const files = req.files.map(file => ({
    id: Date.now() + Math.random(),
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    filename: file.filename, // 🔹 salva nome físico
    url: `/uploads/${file.filename}` // ✅ corrigido
  }));

  material.arquivos.push(...files);

  res.json({ success: true, message: 'Arquivos anexados ao material com sucesso!', files });
});

// Listar arquivos de um material específico
router.get('/:id/uploads', (req, res) => {
  const material = materiais.find(m => m.id === parseInt(req.params.id));
  if (!material) {
    return res.status(404).json({ success: false, message: 'Material não encontrado' });
  }
  res.json({ success: true, arquivos: material.arquivos });
});

// Apagar um upload específico
router.delete('/uploads/:id', (req, res) => {
  const material = materiais.find(m => m.arquivos.some(f => f.id === parseInt(req.params.id)));
  if (!material) {
    return res.status(404).json({ success: false, message: 'Material não encontrado' });
  }

  const index = material.arquivos.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Arquivo não encontrado' });
  }

  const [removido] = material.arquivos.splice(index, 1);

  // Remove do disco
  const filePath = path.join(uploadDir, removido.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  res.json({ success: true, message: 'Upload removido com sucesso!' });
});

module.exports = router;
