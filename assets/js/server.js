
const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());

// Body Parser: Entende JSON e formulários nas requisições
app.use(express.json());                              // Para requisições JSON
app.use(express.urlencoded({ extended: true }));      // Para formulários HTML

// Serve os arquivos HTML/CSS/JS (páginas estáticas)
app.use(express.static('../'));


app.use('/api/auth', require('./routes/auth'));                    // Login e registro
app.use('/api/users', require('./routes/users'));                  // Atualização de perfil
app.use('/api/profissionais', require('./routes/profissionais'));  // Busca de prestadores
app.use('/api/avaliacoes', require('./routes/avaliacoes'));        // Sistema de reviews
app.use('/api/categorias', require('./routes/categorias'));        // Lista de serviços


// Útil para testes e monitoramento
app.get('/api/health', (req, res) => {
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

// Rota catch-all: responde quando URL não existe
app.use((req, res) => {
  res.status(404).json({ error: { message: 'Rota não encontrada' } });
});

// Porta 5000 (padrão) ou a definida na variável de ambiente PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('🚀 Servidor ConectaServiços ONLINE!');
  console.log('════════════════════════════════════════════════════════════');
  console.log(`📍 API disponível em: http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend disponível em: http://localhost:${PORT}`);
  console.log('💾 Modo: Dados em memória (sem banco de dados)');
  console.log('⚡ Pressione Ctrl+C para parar o servidor');
  console.log('════════════════════════════════════════════════════════════\n');
});

module.exports = app;

