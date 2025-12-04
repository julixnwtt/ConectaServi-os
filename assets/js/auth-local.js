// Sistema de autenticação LOCAL (sem servidor)
// Usa apenas LocalStorage do navegador

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
    if (!localStorage.getItem('usuarios')) {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  },

  // Retorna todos os usuários
  getUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
  },

  // Salva lista de usuários
  setUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  },

  // Registra novo usuário
  registro(dados) {
    const usuarios = this.getUsuarios();

    // Valida campos obrigatórios
    if (!dados.nome || !dados.email || !dados.senha || !dados.tipo) {
      return { success: false, error: { message: 'Campos obrigatórios faltando' } };
    }

    // Verifica se email já existe
    if (usuarios.find(u => u.email === dados.email)) {
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

    usuarios.push(novoUsuario);
    this.setUsuarios(usuarios);

    // Faz login automático
    const token = `token_${novoUsuario.id}_${Date.now()}`;
    const { senha, ...userSemSenha } = novoUsuario;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userSemSenha));

    return { success: true, token, user: userSemSenha };
  },

  // Login
  login(email, senha) {
    const usuarios = this.getUsuarios();

    if (!email || !senha) {
      return { success: false, error: { message: 'Email e senha são obrigatórios' } };
    }

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      return { success: false, error: { message: 'Email ou senha incorretos' } };
    }

    const token = `token_${usuario.id}_${Date.now()}`;
    const { senha: _, ...userSemSenha } = usuario;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userSemSenha));

    return { success: true, token, user: userSemSenha };
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
  }
};

// Inicializa ao carregar
AuthLocal.init();

// Torna disponível globalmente
window.AuthLocal = AuthLocal;
