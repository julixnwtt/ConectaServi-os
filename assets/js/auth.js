
const express = require('express');
const router = express.Router();

// Senhas estão em texto puro (NUNCA faça isso em produção!)
let usuarios = [
  {
    id: '1',
    nome: 'Maria Silva',
    email: 'maria@email.com',
    senha: '123456',
    telefone: '(19) 98765-4321',
    tipo: 'prestador',
    profissao: 'Diarista',
    categorias: ['Diarista', 'Faxineiro(a)'],
    descricao: 'Trabalho com limpeza residencial há 8 anos!',
    cidade: 'Indaiatuba',
    estado: 'SP',
    verificado: true,
    avaliacaoMedia: 4.8,
    totalAvaliacoes: 23
  },
  {
    id: '2',
    nome: 'João Santos',
    email: 'joao@email.com',
    senha: '123456',
    telefone: '(19) 99876-5432',
    tipo: 'prestador',
    profissao: 'Eletricista',
    categorias: ['Eletricista'],
    descricao: 'Eletricista profissional com 15 anos de experiência.',
    cidade: 'Campinas',
    estado: 'SP',
    verificado: true,
    avaliacaoMedia: 4.9,
    totalAvaliacoes: 45
  },
  {
    id: '3',
    nome: 'Ana Costa',
    email: 'ana@email.com',
    senha: '123456',
    telefone: '(19) 97654-3210',
    tipo: 'prestador',
    profissao: 'Cabeleireira',
    categorias: ['Cabeleireiro(a)', 'Manicure'],
    descricao: 'Cabeleireira e manicure. Atendimento a domicílio!',
    cidade: 'Indaiatuba',
    estado: 'SP',
    verificado: true,
    avaliacaoMedia: 5.0,
    totalAvaliacoes: 18
  },
  {
    id: '4',
    nome: 'Carlos Oliveira',
    email: 'carlos@email.com',
    senha: '123456',
    telefone: '(11) 96543-2109',
    tipo: 'prestador',
    profissao: 'Programador',
    categorias: ['Programador', 'Designer gráfico'],
    descricao: 'Desenvolvedor full-stack. React, Node.js.',
    cidade: 'São Paulo',
    estado: 'SP',
    verificado: true,
    avaliacaoMedia: 4.7,
    totalAvaliacoes: 12
  },
  {
    id: '5',
    nome: 'Paula Mendes',
    email: 'paula@email.com',
    senha: '123456',
    telefone: '(19) 95432-1098',
    tipo: 'prestador',
    profissao: 'Babá de animais',
    categorias: ['Babá de animais', 'Adestrador de cães'],
    descricao: 'Amo animais! Cuido do seu pet com carinho.',
    cidade: 'Indaiatuba',
    estado: 'SP',
    verificado: true,
    avaliacaoMedia: 4.9,
    totalAvaliacoes: 31
  },
  {
    id: '6',
    nome: 'Cliente Teste',
    email: 'cliente@email.com',
    senha: '123456',
    telefone: '(19) 94321-0987',
    tipo: 'cliente'
  }
];


let usuarioLogado = null;

// Exporta funções para outros arquivos acessarem os dados
module.exports.getUsuarios = () => usuarios;            // Lista todos os usuários
module.exports.getUsuarioLogado = () => usuarioLogado;  // Retorna quem está logado

// Cria um novo usuário (cliente ou prestador) no sistema.
// Valida dados básicos e verifica duplicidade de email.
router.post('/registro', (req, res) => {
  const { nome, email, senha, telefone, tipo, cidade, estado, categorias, profissao } = req.body;

  // 1️⃣ Valida se campos obrigatórios foram enviados
  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ error: { message: 'Campos obrigatórios faltando' } });
  }

  // 2️⃣ Verifica se email já está cadastrado (não permite duplicatas)
  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({ error: { message: 'Email já cadastrado' } });
  }

  // 3️⃣ Cria objeto do novo usuário
  const novoUsuario = {
    id: String(usuarios.length + 1),
    nome,
    email,
    senha,
    telefone,
    tipo,
    ...(tipo === 'prestador' && { cidade, estado, categorias, profissao, avaliacaoMedia: 0, totalAvaliacoes: 0 })
  };

  usuarios.push(novoUsuario);
  usuarioLogado = novoUsuario;

  const { senha: _, ...userSemSenha } = novoUsuario;
  const token = `token_${novoUsuario.id}_${Date.now()}`;

  res.status(201).json({
    success: true,
    token,
    user: userSemSenha
  });
});

// Autentica usuário com email e senha.
// Retorna token fake e dados do usuário (sem a senha).
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: { message: 'Email e senha são obrigatórios' } });
  }

  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ error: { message: 'Email ou senha incorretos' } });
  }

  usuarioLogado = usuario;
  const { senha: _, ...userSemSenha } = usuario;
  const token = `token_${usuario.id}_${Date.now()}`;

  res.json({
    success: true,
    token,
    user: userSemSenha
  });
});

// Retorna informações do usuário atualmente logado.
router.get('/me', (req, res) => {
  if (!usuarioLogado) {
    return res.status(401).json({ error: { message: 'Não autorizado' } });
  }

  const { senha: _, ...userSemSenha } = usuarioLogado;

  res.json({
    success: true,
    user: userSemSenha
  });
});

module.exports = router;
