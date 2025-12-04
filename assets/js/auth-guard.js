
(function() {
  // Páginas que podem exigir autenticação (opcional - não mais obrigatório)
  // O auth-guard agora apenas adiciona funcionalidades para usuários logados
  // mas não bloqueia o acesso
})();

// Função para fazer logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'cadastro.html';
}

// Função para obter dados do usuário logado
function getUsuarioLogado() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Função para verificar se está logado
function isLogado() {
  return !!localStorage.getItem('token');
}
