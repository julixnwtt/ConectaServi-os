const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');

// Dados de avaliações em memória
let avaliacoes = [
  {
    id: '1',
    prestador: '1',
    cliente: '6',
    nota: 5,
    comentario: 'Excelente profissional! Muito caprichosa e pontual. Super recomendo!',
    servico: 'Limpeza residencial',
    data: new Date('2024-10-15')
  },
  {
    id: '2',
    prestador: '2',
    cliente: '6',
    nota: 5,
    comentario: 'Resolveu o problema elétrico rapidamente. Muito competente!',
    servico: 'Instalação elétrica',
    data: new Date('2024-10-20')
  },
  {
    id: '3',
    prestador: '3',
    cliente: '6',
    nota: 5,
    comentario: 'Adorei o resultado! Ela é super atenciosa e trabalha muito bem.',
    servico: 'Corte e escova',
    data: new Date('2024-11-01')
  }
];

// Listar avaliações
router.get('/', (req, res) => {
  const { prestador, nota, page = 1, limit = 10 } = req.query;
  const usuarios = authRoutes.getUsuarios();

  let resultado = [...avaliacoes];

  // Aplicar filtros
  if (prestador) {
    resultado = resultado.filter(a => a.prestador === prestador);
  }

  if (nota) {
    resultado = resultado.filter(a => a.nota === parseInt(nota));
  }

  // Ordenar por data (mais recentes primeiro)
  resultado.sort((a, b) => b.data - a.data);

  // Paginação
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const paginados = resultado.slice(skip, skip + parseInt(limit));

  // Popular com dados de usuários
  const avaliacoesPopuladas = paginados.map(av => {
    const cliente = usuarios.find(u => u.id === av.cliente);
    const prestador = usuarios.find(u => u.id === av.prestador);
    
    return {
      ...av,
      cliente: cliente ? { id: cliente.id, nome: cliente.nome, avatar: cliente.avatar } : null,
      prestador: prestador ? { id: prestador.id, nome: prestador.nome, profissao: prestador.profissao, avatar: prestador.avatar } : null
    };
  });

  res.json({
    success: true,
    count: avaliacoesPopuladas.length,
    total: resultado.length,
    totalPages: Math.ceil(resultado.length / parseInt(limit)),
    currentPage: parseInt(page),
    avaliacoes: avaliacoesPopuladas
  });
});

// Criar nova avaliação
router.post('/', (req, res) => {
  const { prestador, nota, comentario, servico } = req.body;
  const usuarioLogado = authRoutes.getUsuarioLogado();

  // Validações
  if (!usuarioLogado) {
    return res.status(401).json({ error: { message: 'Não autorizado' } });
  }

  if (usuarioLogado.tipo !== 'cliente') {
    return res.status(403).json({ error: { message: 'Apenas clientes podem avaliar' } });
  }

  if (!prestador || !nota || !comentario || !servico) {
    return res.status(400).json({ error: { message: 'Campos obrigatórios faltando' } });
  }

  if (nota < 1 || nota > 5) {
    return res.status(400).json({ error: { message: 'Nota deve ser entre 1 e 5' } });
  }

  const usuarios = authRoutes.getUsuarios();
  const prestadorExiste = usuarios.find(u => u.id === prestador && u.tipo === 'prestador');

  if (!prestadorExiste) {
    return res.status(404).json({ error: { message: 'Prestador não encontrado' } });
  }

  // Verificar se já avaliou
  const jaAvaliou = avaliacoes.some(a => a.prestador === prestador && a.cliente === usuarioLogado.id);
  if (jaAvaliou) {
    return res.status(400).json({ error: { message: 'Você já avaliou este prestador' } });
  }

  // Criar avaliação
  const novaAvaliacao = {
    id: String(avaliacoes.length + 1),
    prestador,
    cliente: usuarioLogado.id,
    nota: parseInt(nota),
    comentario,
    servico,
    data: new Date()
  };

  avaliacoes.push(novaAvaliacao);

  // Atualizar média do prestador
  const avaliacoesPrestador = avaliacoes.filter(a => a.prestador === prestador);
  const media = avaliacoesPrestador.reduce((acc, a) => acc + a.nota, 0) / avaliacoesPrestador.length;
  prestadorExiste.avaliacaoMedia = Math.round(media * 10) / 10;
  prestadorExiste.totalAvaliacoes = avaliacoesPrestador.length;

  res.status(201).json({
    success: true,
    avaliacao: {
      ...novaAvaliacao,
      cliente: { id: usuarioLogado.id, nome: usuarioLogado.nome },
      prestador: { id: prestadorExiste.id, nome: prestadorExiste.nome, profissao: prestadorExiste.profissao }
    }
  });
});

// Estatísticas de avaliações
router.get('/stats/:prestadorId', (req, res) => {
  const avaliacoesPrestador = avaliacoes.filter(a => a.prestador === req.params.prestadorId);

  const distribuicao = [1, 2, 3, 4, 5].map(nota => ({
    _id: nota,
    count: avaliacoesPrestador.filter(a => a.nota === nota).length
  })).filter(d => d.count > 0);

  res.json({
    success: true,
    totalAvaliacoes: avaliacoesPrestador.length,
    distribuicao
  });
});

module.exports = router;
