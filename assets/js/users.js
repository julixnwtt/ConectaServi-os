

const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');

// Permite atualizar dados pessoais. Prestadores podem editar mais campos.
router.put('/perfil', (req, res) => {
  const usuarioLogado = authRoutes.getUsuarioLogado();

  // Verifica se há alguém logado
  if (!usuarioLogado) {
    return res.status(401).json({ error: { message: 'Não autorizado' } });
  }

  const { nome, telefone, cidade, estado, profissao, categorias, descricao } = req.body;

 
  // Atualiza apenas campos que foram enviados e são permitidos
 
  if (nome) usuarioLogado.nome = nome;
  if (telefone) usuarioLogado.telefone = telefone;

  if (usuarioLogado.tipo === 'prestador') {
    if (cidade) usuarioLogado.cidade = cidade;
    if (estado) usuarioLogado.estado = estado;
    if (profissao) usuarioLogado.profissao = profissao;
    if (categorias) usuarioLogado.categorias = categorias;
    if (descricao) usuarioLogado.descricao = descricao;
  }

  const { senha, ...userSemSenha } = usuarioLogado;

  res.json({
    success: true,
    user: userSemSenha
  });
});

module.exports = router;
