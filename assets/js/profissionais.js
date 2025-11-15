
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');  // Importa array de usuários

// 
//  ROTA: BUSCAR PROFISSIONAIS COM FILTROS

router.get('/', (req, res) => {
  const { categoria, cidade, estado, nota, busca, page = 1, limit = 12 } = req.query;

  let usuarios = authRoutes.getUsuarios();
  let profissionais = usuarios.filter(u => u.tipo === 'prestador');  // Só prestadores

 
  // Aplica cada filtro sequencialmente (só se parâmetro foi enviado)
  
  if (categoria) {
    profissionais = profissionais.filter(p => 
      p.categorias && p.categorias.some(c => c.toLowerCase().includes(categoria.toLowerCase()))
    );
  }

  if (cidade) {
    profissionais = profissionais.filter(p => 
      p.cidade && p.cidade.toLowerCase().includes(cidade.toLowerCase())
    );
  }

  if (estado) {
    profissionais = profissionais.filter(p => 
      p.estado && p.estado.toLowerCase().includes(estado.toLowerCase())
    );
  }

  if (nota) {
    profissionais = profissionais.filter(p => p.avaliacaoMedia >= parseFloat(nota));
  }

  if (busca) {
    const buscaLower = busca.toLowerCase();
    profissionais = profissionais.filter(p =>
      (p.nome && p.nome.toLowerCase().includes(buscaLower)) ||
      (p.profissao && p.profissao.toLowerCase().includes(buscaLower)) ||
      (p.descricao && p.descricao.toLowerCase().includes(buscaLower))
    );
  }

  // Ordenar por avaliação
  profissionais.sort((a, b) => (b.avaliacaoMedia || 0) - (a.avaliacaoMedia || 0));

  // Paginação
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const paginados = profissionais.slice(skip, skip + parseInt(limit));

  // Remover senhas
  const profissionaisSemSenha = paginados.map(({ senha, ...rest }) => rest);

  res.json({
    success: true,
    count: profissionaisSemSenha.length,
    total: profissionais.length,
    totalPages: Math.ceil(profissionais.length / parseInt(limit)),
    currentPage: parseInt(page),
    profissionais: profissionaisSemSenha
  });
});

// Obter detalhes de um profissional
router.get('/:id', (req, res) => {
  const usuarios = authRoutes.getUsuarios();
  const profissional = usuarios.find(u => u.id === req.params.id && u.tipo === 'prestador');

  if (!profissional) {
    return res.status(404).json({ error: { message: 'Profissional não encontrado' } });
  }

  const { senha, ...profissionalSemSenha } = profissional;

  res.json({
    success: true,
    profissional: profissionalSemSenha
  });
});

module.exports = router;
