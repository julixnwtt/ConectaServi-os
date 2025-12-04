// Sistema de autenticação LOCAL (sem servidor)
// Usa apenas LocalStorage do navegador

// Verifica se localStorage está disponível
function isLocalStorageAvailable() {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.error('localStorage não está disponível:', e);
    return false;
  }
}

if (!isLocalStorageAvailable()) {
  alert('ERRO: Seu navegador não suporta localStorage. O sistema de login não funcionará.');
}

const AuthLocal = {
  // Dados iniciais de usuários (apenas para demonstração)
  usuarios: [
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
  ],

  // Inicializa o sistema
  init() {
    console.log('🔵 AuthLocal.init() chamado');
    console.log('🔵 URL atual:', window.location.href);
    
    if (!isLocalStorageAvailable()) {
      console.error('❌ localStorage NÃO disponível!');
      return;
    }
    
    try {
      const usuariosExistentes = localStorage.getItem('usuarios');
      console.log('🔵 Usuários existentes no localStorage:', usuariosExistentes ? 'SIM' : 'NÃO');
      
      if (!usuariosExistentes || usuariosExistentes === 'null' || usuariosExistentes === '[]') {
        console.log('🟢 Inicializando usuarios no localStorage...');
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        console.log('✅ Usuários inicializados:', this.usuarios.length);
        
        // Verificação
        const verificacao = localStorage.getItem('usuarios');
        console.log('🔍 Verificação: dados foram salvos?', verificacao !== null);
      } else {
        const usuarios = JSON.parse(usuariosExistentes);
        console.log('✅ Usuarios já existem no localStorage:', usuarios.length);
        if (usuarios.length > 0) {
          console.log('📧 Emails cadastrados:', usuarios.map(u => u.email).join(', '));
        }
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar localStorage:', error);
      try {
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        console.log('🔄 Tentativa de recuperação bem-sucedida');
      } catch (e) {
        console.error('❌ Falha na recuperação:', e);
      }
    }
  },

  // Retorna todos os usuários
  getUsuarios() {
    try {
      const usuariosStr = localStorage.getItem('usuarios');
      if (!usuariosStr || usuariosStr === 'null') {
        console.log('localStorage vazio, retornando array vazio');
        return [];
      }
      const usuarios = JSON.parse(usuariosStr);
      console.log('Total de usuários:', usuarios.length);
      return Array.isArray(usuarios) ? usuarios : [];
    } catch (error) {
      console.error('Erro ao ler usuarios do localStorage:', error);
      return [];
    }
  },

  // Salva lista de usuários
  setUsuarios(usuarios) {
    try {
      if (!Array.isArray(usuarios)) {
        console.error('setUsuarios: esperava array, recebeu:', typeof usuarios);
        return;
      }
      console.log('Salvando', usuarios.length, 'usuários no localStorage');
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      console.log('Usuários salvos com sucesso');
      
      // Verificação
      const verificacao = localStorage.getItem('usuarios');
      console.log('Verificação: dados salvos?', verificacao !== null && verificacao !== 'null');
    } catch (error) {
      console.error('Erro ao salvar usuarios no localStorage:', error);
    }
  },

  // Registra novo usuário
  registro(dados) {
    console.log('=== 🔵 INICIANDO REGISTRO ===');
    console.log('📝 Dados recebidos:', {
      nome: dados.nome,
      email: dados.email,
      tipo: dados.tipo,
      telefone: dados.telefone ? 'SIM' : 'NÃO',
      senha: dados.senha ? 'SIM' : 'NÃO'
    });
    
    try {
      const usuarios = this.getUsuarios();
      console.log('👥 Usuários atuais no sistema:', usuarios.length);

      // Valida campos obrigatórios
      if (!dados.nome || !dados.email || !dados.senha || !dados.tipo) {
        console.error('❌ Campos obrigatórios faltando:', {
          nome: !!dados.nome,
          email: !!dados.email,
          senha: !!dados.senha,
          tipo: !!dados.tipo
        });
        return { success: false, error: { message: 'Campos obrigatórios faltando' } };
      }

      // Verifica se email já existe
      const emailExiste = usuarios.find(u => u.email.toLowerCase() === dados.email.toLowerCase());
      if (emailExiste) {
        console.warn('⚠️ Email já cadastrado:', dados.email);
        return { success: false, error: { message: 'Email já cadastrado' } };
      }

      // Cria novo usuário
      const novoUsuario = {
        id: String(Date.now()),
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        telefone: dados.telefone || '',
        tipo: dados.tipo,
        ...(dados.tipo === 'prestador' && {
          cidade: dados.cidade || '',
          estado: dados.estado || '',
          categorias: dados.categorias || [],
          profissao: dados.profissao || '',
          descricao: dados.descricao || '',
          avaliacaoMedia: 0,
          totalAvaliacoes: 0,
          verificado: false
        })
      };

      console.log('✨ Novo usuário criado:', {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        tipo: novoUsuario.tipo
      });
      
      // Adiciona à lista
      usuarios.push(novoUsuario);
      console.log('➕ Usuário adicionado à array. Total:', usuarios.length);
      
      // Salva no localStorage
      this.setUsuarios(usuarios);
      
      // Verifica se foi salvo
      const usuariosDepois = this.getUsuarios();
      console.log('🔍 Usuários após salvar:', usuariosDepois.length);
      
      if (usuariosDepois.length !== usuarios.length) {
        console.error('❌ ERRO CRÍTICO: Usuário NÃO foi salvo!');
        console.error('Esperado:', usuarios.length, 'Atual:', usuariosDepois.length);
        return { success: false, error: { message: 'Erro ao salvar usuário no localStorage' } };
      }

      // Faz login automático
      const token = `token_${novoUsuario.id}_${Date.now()}`;
      const { senha, ...userSemSenha } = novoUsuario;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userSemSenha));
      
      console.log('🔑 Token gerado e salvo:', token);
      console.log('👤 User salvo (sem senha)');
      console.log('=== ✅ REGISTRO CONCLUÍDO COM SUCESSO ===');

      return { success: true, token, user: userSemSenha };
    } catch (error) {
      console.error('❌ ERRO FATAL ao registrar:', error);
      console.error('Stack:', error.stack);
      return { success: false, error: { message: 'Erro ao processar registro: ' + error.message } };
    }
  },

  // Login
  login(email, senha) {
    console.log('=== INICIANDO LOGIN ===');
    console.log('AuthLocal.login chamado com email:', email);
    
    try {
      const usuarios = this.getUsuarios();
      console.log('Total de usuários no sistema:', usuarios.length);

      if (!email || !senha) {
        console.log('Email ou senha vazios');
        return { success: false, error: { message: 'Email e senha são obrigatórios' } };
      }

      // Busca usuário
      const usuario = usuarios.find(u => {
        const emailMatch = u.email.toLowerCase() === email.toLowerCase();
        const senhaMatch = u.senha === senha;
        console.log(`Verificando ${u.email}: email=${emailMatch}, senha=${senhaMatch}`);
        return emailMatch && senhaMatch;
      });

      if (!usuario) {
        console.log('Credenciais incorretas');
        console.log('Emails disponíveis:', usuarios.map(u => u.email));
        return { success: false, error: { message: 'Email ou senha incorretos' } };
      }

      console.log('Login bem-sucedido para:', usuario.nome);
      const token = `token_${usuario.id}_${Date.now()}`;
      const { senha: _, ...userSemSenha } = usuario;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userSemSenha));
      
      console.log('Token salvo:', token);
      console.log('User salvo:', userSemSenha);
      console.log('=== LOGIN CONCLUÍDO COM SUCESSO ===');

      return { success: true, token, user: userSemSenha };
    } catch (error) {
      console.error('ERRO ao fazer login:', error);
      return { success: false, error: { message: 'Erro ao processar login: ' + error.message } };
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  },

  // Retorna usuário logado
  getUsuarioLogado() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      return { success: false, error: { message: 'Não autorizado' } };
    }

    return { success: true, user: JSON.parse(user) };
  },

  // Deleta conta
  deletarConta() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      return { success: false, error: { message: 'Não autorizado' } };
    }

    const usuarioLogado = JSON.parse(user);
    const usuarios = this.getUsuarios();
    const novosUsuarios = usuarios.filter(u => u.id !== usuarioLogado.id);
    
    this.setUsuarios(novosUsuarios);
    this.logout();

    return { success: true, message: 'Conta deletada com sucesso' };
  },

  // Debug: mostra estado do localStorage
  debug() {
    console.log('=== DEBUG AUTHLOCAL ===');
    console.log('localStorage.usuarios:', localStorage.getItem('usuarios'));
    console.log('localStorage.token:', localStorage.getItem('token'));
    console.log('localStorage.user:', localStorage.getItem('user'));
    
    const usuarios = this.getUsuarios();
    console.log('Usuários parseados:', usuarios);
    console.log('Total de usuários:', usuarios.length);
    
    if (usuarios.length > 0) {
      console.log('Emails cadastrados:', usuarios.map(u => u.email));
    }
    
    return {
      totalUsuarios: usuarios.length,
      usuarios: usuarios,
      logado: !!localStorage.getItem('token')
    };
  },

  // Limpa todo o localStorage (CUIDADO!)
  resetar() {
    console.log('RESETANDO localStorage...');
    localStorage.removeItem('usuarios');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.init();
    console.log('localStorage resetado e reinicializado');
  }
};

// Inicializa ao carregar o script
console.log('Carregando AuthLocal...');
try {
  AuthLocal.init();
  console.log('AuthLocal inicializado com sucesso');
} catch (error) {
  console.error('Erro ao inicializar AuthLocal:', error);
}

// Torna disponível globalmente
window.AuthLocal = AuthLocal;
console.log('AuthLocal disponível globalmente');

// Debug automático em desenvolvimento
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('Modo de desenvolvimento detectado');
  window.debugAuth = () => AuthLocal.debug();
  console.log('Use debugAuth() no console para ver o estado do sistema');
}
