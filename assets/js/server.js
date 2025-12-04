const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());                              // Para requisições JSON
app.use(express.urlencoded({ extended: true }));      // Para formulários HTML

// Serve os arquivos HTML/CSS/JS (páginas estáticas)
app.use(express.static('../'));

// Importa as rotas locais
const authRoutes = require('./auth');
const avaliacoesRoutes = require('./avaliacoes');
const usersRoutes = require('./users');

app.use('/auth', authRoutes);           // Login e registro
app.use('/avaliacoes', avaliacoesRoutes);  // Sistema de reviews
app.use('/users', usersRoutes);         // Gerenciamento de perfil

// Útil para testes e monitoramento
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API ConectaServiços está online!' });
});

// Captura erros que acontecem durante as requisições
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log do erro no console
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Erro interno do servidor'
    }
  });
});

// responde quando URL não existe
app.use((req, res) => {
  res.status(404).json({ error: { message: 'Rota não encontrada' } });
});

// Porta 3000 (padrão) ou a definida na variável de ambiente PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('🚀 Servidor ConectaServiços ONLINE!');
  console.log('════════════════════════════════════════════════════════════');
  console.log(`📍 API disponível em: http://localhost:${PORT}`);
  console.log(`🌐 Frontend disponível em: http://localhost:${PORT}`);
  console.log('💾 Modo: Dados em memória (sem banco de dados)');
  console.log('⚡ Pressione Ctrl+C para parar o servidor');
  console.log('════════════════════════════════════════════════════════════\n');
});

module.exports = app;

