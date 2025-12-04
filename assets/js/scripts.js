(function($){
  'use strict';
  
  const LS = {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch(e) {
        console.warn('⚠️ Não consegui salvar no LocalStorage:', e);
        return false;
      }
    },
    get(key, defaultValue = null) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
      } catch(e) {
        console.warn('⚠️ Erro ao ler LocalStorage:', e);
        return defaultValue;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch(e) {
        return false;
      }
    }
  };

  const CATEGORIAS = [
    "Diarista", "Faxineiro(a)", "Passadeira", "Cozinheiro(a)", "Babá", 
    "Cuidador(a) de idosos", "Enfermeiro(a)", "Pedreiro(a)", "Pintor(a)", 
    "Eletricista", "Encanador(a)", "Jardineiro(a)", "Marceneiro(a)", 
    "Serralheiro(a)", "Vidraceiro(a)", "Montador(a) de móveis", "Mecânico(a)", 
    "Eletricista de autos", "Manicure/Pedicure", "Cabeleireiro(a)", "Barbeiro(a)", 
    "Maquiador(a)", "Esteticista", "Massagista", "Personal trainer", 
    "Professor particular", "Músico", "DJ", "Fotógrafo(a)", "Videomaker", 
    "Designer gráfico", "Programador(a)", "Técnico de informática", 
    "Motorista particular", "Motoboy", "Advogado(a)", "Contador(a)", 
    "Arquiteto(a)", "Engenheiro(a)", "Corretor(a) de imóveis", "Despachante", 
    "Costureiro(a)", "Tapeceiro(a)", "Chaveiro(a)", "Dedetizador(a)", 
    "Limpeza de piscina", "Instalador de ar-condicionado", "Técnico de celular", 
    "Babá de animais", "Tosador(a)", "Veterinário(a)"
  ];

  const Header = `
<header class="navbar navbar-expand-lg bg-body sticky-top shadow-sm glass-nav">
  <div class="container">
    <a class="navbar-brand d-flex align-items-center gap-2 brand-3d" href="home.html" aria-label="ConectaServiços - Página inicial">
      <svg width="38" height="38" viewBox="0 0 64 64" class="logo-svg" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="blueFace" x1="0" x2="1"><stop offset="0" stop-color="#4682B4"/><stop offset="1" stop-color="#008080"/></linearGradient>
          <linearGradient id="blueSide" x1="0" x2="1"><stop offset="0" stop-color="#2F4F4F"/><stop offset="1" stop-color="#708090"/></linearGradient>
          <linearGradient id="purpleFace" x1="0" x2="1"><stop offset="0" stop-color="#3A0066"/><stop offset="1" stop-color="#5A4A7A"/></linearGradient>
          <filter id="logoDepth" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#2F4F4F" flood-opacity="0.45"/><feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#000" flood-opacity="0.12"/></filter>
          <filter id="specLight" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur"/><feSpecularLighting in="blur" surfaceScale="3" specularConstant=".85" specularExponent="20" lighting-color="#ffffff" result="spec"><fePointLight x="-50" y="-40" z="100"/></feSpecularLighting><feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/><feMerge><feMergeNode in="specOut"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g filter="url(#logoDepth)"><g transform="translate(1.8,2)" opacity="0.55"><circle cx="18" cy="18" r="8" fill="url(#blueSide)"/><circle cx="46" cy="18" r="8" fill="url(#blueSide)"/><rect x="8" y="30" rx="8" ry="8" width="20" height="20" fill="url(#blueSide)"/><rect x="36" y="30" rx="8" ry="8" width="20" height="20" fill="url(#blueSide)"/><path d="M22,36 A10,10 0 0 1 42,36" fill="none" stroke="#3A0066" stroke-width="8" stroke-linecap="round"/></g><g filter="url(#specLight)"><circle cx="18" cy="18" r="8" fill="url(#blueFace)"/><circle cx="46" cy="18" r="8" fill="url(#blueFace)"/><rect x="8" y="30" rx="8" ry="8" width="20" height="20" fill="url(#blueFace)"/><rect x="36" y="30" rx="8" ry="8" width="20" height="20" fill="url(#blueFace)"/><path d="M22,36 A10,10 0 0 1 42,36" fill="none" stroke="url(#purpleFace)" stroke-width="8" stroke-linecap="round"/></g></g>
      </svg>
      <span class="fw-bold fs-5 brand-text">Conecta<span class="text-orange">Serviços</span><span class="shine"></span></span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-expanded="false" aria-label="Menu de navegação"><span class="navbar-toggler-icon"></span></button>
    <nav id="nav" class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
        <li class="nav-item"><a class="nav-link" href="home.html">Início</a></li>
        <li class="nav-item"><a class="nav-link" href="como-funciona.html">Como funciona</a></li>
        <li class="nav-item"><a class="nav-link" href="profissionais.html">Profissionais</a></li>
        <li class="nav-item"><a class="nav-link" href="avaliacoes.html">Avaliações</a></li>
        <li class="nav-item" id="userMenuItem"></li>
      </ul>
    </nav>
  </div>
</header>`;

  $(function(){
    initHeader();
    initFooter();
    initCategorias();
    initStars();
    initFiltroProfissionais();
    initFiltroAvaliacoes();
    initMapa();
    initTermsBanner();
    initForms();
    initCookieBanner();
    initHelpChat();
  });

  function initHeader() {
    const $header = $("#site-header");
    if($header.length) {
      $header.replaceWith(Header);
      
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const userName = user.nome ? user.nome.split(' ')[0] : 'Usuário';
          $('#userMenuItem').html(`
            <div class="dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                👤 ${userName}
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick="logout(); return false;">Sair</a></li>
              </ul>
            </div>
          `);
        } catch (e) {
          console.error('Erro ao processar dados do usuário', e);
        }
      } else {
        $('#userMenuItem').html(`
          <div class="dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Cadastre-se
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="cadastro-cliente.html">Como Cliente</a></li>
              <li><a class="dropdown-item" href="cadastro-prestador.html">Como Prestador</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="cadastro.html">Fazer Login</a></li>
            </ul>
          </div>
        `);
      }
    }
  }

  function initFooter() {
    $('#y').text(new Date().getFullYear());
  }

  function initCategorias() {
    const $filtroSelects = $('#fCategoria, #rCategoria');
    $filtroSelects.each(function() {
      const $select = $(this);
      const currentValue = $select.val();
      $select.empty().append('<option value="">Todas</option>');
      CATEGORIAS.forEach(cat => {
        $select.append(`<option value="${cat}">${cat}</option>`);
      });
      if(currentValue) $select.val(currentValue);
    });

    const $cadastroSelects = $('select[name="categoria"]');
    $cadastroSelects.each(function() {
      const $select = $(this);
      const currentValue = $select.val();
      $select.empty().append('<option value="">Selecione</option>');
      CATEGORIAS.forEach(cat => {
        $select.append(`<option value="${cat}">${cat}</option>`);
      });
      if(currentValue) $select.val(currentValue);
    });
  }

  function initStars() {
    $('.stars').each(function() {
      const $star = $(this);
      const rating = parseFloat($star.data('stars') || 0);
      const percentage = Math.max(0, Math.min(100, (rating / 5) * 100));
      
      $star.css('--p', percentage + '%')
           .attr('title', `${rating.toFixed(1)} de 5 estrelas`)
           .attr('aria-label', `Avaliação: ${rating.toFixed(1)} de 5 estrelas`);
    });
  }

  function initFiltroProfissionais() {
    const $btnFiltrar = $('#btnFiltrar');
    if(!$btnFiltrar.length) return;

    const savedFilters = LS.get('filtrosProfissionais', {});
    if(savedFilters.categoria) $('#fCategoria').val(savedFilters.categoria);
    if(savedFilters.cidade) $('#fCidade').val(savedFilters.cidade);

    function aplicarFiltro() {
      const categoria = ($('#fCategoria').val() || '').toLowerCase().trim();
      const cidade = ($('#fCidade').val() || '').toLowerCase().trim();

      // Percorre cada card de profissional e decide se mostra ou esconde
      $('.prof-card').each(function() {
        const $card = $(this);
        const cardCat = ($card.data('cat') || '').toLowerCase();
        const cardCidade = ($card.data('cidade') || '').toLowerCase();
        
        // Se filtro vazio OU texto encontrado = match positivo
        const matchCategoria = !categoria || cardCat.includes(categoria);
        const matchCidade = !cidade || cardCidade.includes(cidade);
        
        // Mostra card apenas se AMBOS os filtros deram match
        $card.toggle(matchCategoria && matchCidade);
      });
    }

    // Aplica filtros salvos assim que a página carrega
    aplicarFiltro();

    // Quando usuário clica no botão "Filtrar"
    $btnFiltrar.on('click', function() {
      // Salva preferências do usuário para próxima vez
      LS.set('filtrosProfissionais', {
        categoria: $('#fCategoria').val(),
        cidade: $('#fCidade').val()
      });
      aplicarFiltro();
    });

    // Permite filtrar pressionando Enter nos campos
    $('#fCategoria, #fCidade').on('keypress', function(e) {
      if(e.which === 13) { // 13 = tecla Enter
        e.preventDefault();
        $btnFiltrar.trigger('click'); // Simula clique no botão
      }
    });
  }

  
  function initFiltroAvaliacoes() {
    const $btnFiltrar = $('#btnFiltrarAvaliacao');
    if(!$btnFiltrar.length) return; // Se não existe botão, sai

    // Restaura filtros salvos da última visita
    const savedFilters = LS.get('filtrosAvaliacoes', {});
    if(savedFilters.categoria) $('#rCategoria').val(savedFilters.categoria);
    if(savedFilters.min) $('#rMin').val(savedFilters.min);

    // Função que filtra as avaliações
    function aplicarFiltro() {
      const categoria = ($('#rCategoria').val() || '').toLowerCase().trim();
      const minRating = parseFloat($('#rMin').val() || 0); // Ex: 4.0

      // Percorre cada card de avaliação
      $('.review').each(function() {
        const $review = $(this);
        const reviewCat = ($review.data('cat') || '').toLowerCase();
        const reviewStars = parseFloat($review.data('stars') || 0);
        
        // Verifica se categoria bate E se nota é maior/igual ao mínimo
        const matchCategoria = !categoria || reviewCat.includes(categoria);
        const matchRating = reviewStars >= minRating;
        
        // Mostra apenas se AMBOS os critérios forem verdadeiros
        $review.toggle(matchCategoria && matchRating);
      });
    }

    // Aplica filtro assim que página carrega
    aplicarFiltro();

    // Quando usuário clica em "Filtrar"
    $btnFiltrar.on('click', function() {
      // Salva preferências para próxima visita
      LS.set('filtrosAvaliacoes', {
        categoria: $('#rCategoria').val(),
        min: $('#rMin').val()
      });
      aplicarFiltro();
    });
  }

  
  function initMapa() {
    // Só executa se existe elemento #map E biblioteca Leaflet carregada
    if(!$('#map').length || !window.L) return;

    // Coordenadas de Indaiatuba, SP
    const defaultConfig = { center: [-23.091, -47.218], zoom: 13 };
    
    // Tenta restaurar última posição salva do usuário
    const mapState = LS.get('mapState', defaultConfig);

    // Cria o mapa na posição salva (ou padrão)
    const map = L.map('map', { zoomControl: true })
      .setView(mapState.center, mapState.zoom);

    // Adiciona camada de tiles do OpenStreetMap (os "quadradinhos" do mapa)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Marcador fixo na localização da equipe
    L.marker(defaultConfig.center)
      .addTo(map)
      .bindPopup('<b>Equipe de desenvolvimento</b><br>Indaiatuba, SP');

    // Salva posição toda vez que usuário move ou dá zoom
    map.on('moveend zoomend', function() {
      const center = map.getCenter();
      LS.set('mapState', {
        center: [center.lat, center.lng],
        zoom: map.getZoom()
      });
    });
  }

  
  function initTermsBanner() {
    // Atualiza interface baseado na aceitação dos termos
    function updateTermsState() {
      const accepted = LS.get('termsAccepted', false) === true;
      
      // Mostra banner apenas se ainda NÃO aceitou
      $('#termsBanner').toggle(!accepted);
      
      // Desabilita botões de cadastro se não aceitou
      $('form#formCliente button[type="submit"], form#formPrestador button[type="submit"]')
        .prop('disabled', !accepted);
    }

    updateTermsState(); // Verifica estado inicial

    // Quando usuário clica em "Concordo"
    $('#btnConcordo').on('click', function() {
      LS.set('termsAccepted', true);
      alert('✅ Obrigado! Você já pode criar sua conta.');
      updateTermsState();
    });

    // Quando usuário clica em "Discordo"
    $('#btnDiscordo').on('click', function() {
      LS.set('termsAccepted', false);
      alert('⚠️ Você precisa aceitar os termos para criar conta.');
      updateTermsState();
    });
  }

  
  function initForms() {
    const forms = [
      { sel: '#formCliente', key: 'formCliente' },      // Formulário de cadastro cliente
      { sel: '#formPrestador', key: 'formPrestador' }   // Formulário de cadastro prestador
    ];

    forms.forEach(formConfig => {
      const $form = $(formConfig.sel);
      if(!$form.length) return; // Se formulário não existe nesta página, pula

      // Restaura dados previamente digitados (recuperação automática!)
      const savedData = LS.get(formConfig.key, {});
      Object.keys(savedData).forEach(fieldName => {
        $form.find(`[name="${fieldName}"]`).val(savedData[fieldName]);
      });

      // Salva automaticamente a cada mudança nos campos
      $form.on('input change', 'input, select, textarea', function() {
        const formData = {};
        $form.serializeArray().forEach(field => {
          formData[field.name] = field.value;
        });
        LS.set(formConfig.key, formData); // Salva tudo no LocalStorage
      });

      // Quando usuário envia o formulário
      $form.on('submit', function(e) {
        e.preventDefault(); // Impede envio tradicional
        
        // Verifica se aceitou os termos antes de permitir cadastro
        if(LS.get('termsAccepted', false) !== true) {
          alert('⚠️ Para criar conta, vá em Legal > Cartilha e clique em "Concordo".');
          return;
        }
        
        alert('✅ Cadastro salvo localmente (demo).');
      });
    });
  }

  
  function initCookieBanner() {
    // Exibe banner apenas se usuário nunca fez escolha
    function showBanner() {
      const accepted = LS.get('cookiesAccepted');
      // null ou undefined = primeira visita
      if(accepted === null || accepted === undefined) {
        $('.cookie-banner').addClass('show'); // Exibe imediatamente ao abrir o site
      }
    }

    // Quando usuário aceita os cookies
    $('#btnAcceptCookies').on('click', function() {
      LS.set('cookiesAccepted', true);
      $('.cookie-banner').removeClass('show'); // Esconde banner com animação
    });

    // Quando usuário recusa os cookies
    $('#btnDeclineCookies').on('click', function() {
      LS.set('cookiesAccepted', false);
      $('.cookie-banner').removeClass('show');
      alert('⚠️ Você optou por não aceitar cookies. Algumas funcionalidades podem ser limitadas.');
    });

    showBanner(); // Verifica se deve mostrar
  }

  
  function initHelpChat() {
    const $chat = $('#helpChat');
    if(!$chat.length) return; // Se não existe chat na página, sai

    const $list = $chat.find('.help-chat-body');     // Container de mensagens
    const $input = $chat.find('input[name="msg"]');  // Campo de digitação
    const history = LS.get('helpChatHistory', []);   // Histórico salvo

    /*
     * Base de conhecimento: pares de palavras-chave → respostas
     * Para adicionar novos assuntos, basta incluir um novo objeto aqui!
     */
    const knowledgeBase = [
      {
        keywords: ['cadastro', 'conta', 'registr', 'criar'],
        answer: '📝 Para criar conta, use o menu "Cadastre-se". Se aparecer bloqueio, vá em **Legal** e clique em **Concordo** na cartilha.'
      },
      {
        keywords: ['mapa', 'local', 'endereço', 'onde', 'localização'],
        answer: '📍 O mapa de contato mostra nossa localização em **Indaiatuba, SP** (Equipe de desenvolvimento).'
      },
      {
        keywords: ['privacidade', 'lgpd', 'dados', 'informação'],
        answer: '🔒 Seus dados são tratados com segurança e você pode solicitar acesso/remoção a qualquer momento. Veja **Legal > Termos de Privacidade**.'
      },
      {
        keywords: ['erro', 'bug', 'problema', 'não funciona'],
        answer: '🔧 Tente recarregar a página (Ctrl+F5) e limpar o cache. Se persistir, descreva o problema detalhadamente aqui.'
      },
      {
        keywords: ['avali', 'estrela', 'nota', 'comentário'],
        answer: '⭐ As avaliações são públicas e baseadas em experiências reais dos clientes. Todas são verificadas!'
      },
      {
        keywords: ['cookie', 'aceitar'],
        answer: '🍪 Usamos cookies para melhorar sua experiência. Você pode gerenciar suas preferências a qualquer momento.'
      },
      {
        keywords: ['preço', 'valor', 'quanto custa', 'pagar'],
        answer: '💰 Os valores são negociados diretamente com os prestadores. Não cobramos taxa de intermediação!'
      },
      {
        keywords: ['segur', 'confiável', 'verificado'],
        answer: '🛡️ Todos os profissionais têm identidade verificada. Confira as avaliações de outros clientes antes de contratar.'
      }
    ];

    // Renderiza todas as mensagens do histórico na tela
    function renderChat() {
      $list.empty(); // Limpa conteúdo atual
      
      history.forEach(msg => {
        const side = msg.role === 'user' ? 'user' : 'bot'; // Define alinhamento
        // Converte **texto** em <strong>texto</strong> para negrito
        const html = $('<div>').text(msg.text).html().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        $list.append(`<div class="help-chat-msg ${side}"><div class="b">${html}</div></div>`);
      });
      
      $list.scrollTop($list[0].scrollHeight); // Auto-scroll para última mensagem
    }

    // Procura resposta adequada baseada no que usuário digitou
    function getBotResponse(userText) {
      const lower = userText.toLowerCase(); // Deixa tudo minúsculo para comparar
      
      // Procura se alguma palavra-chave aparece na mensagem do usuário
      for(const kb of knowledgeBase) {
        if(kb.keywords.some(keyword => lower.includes(keyword))) {
          return kb.answer; // Achou! Retorna resposta correspondente
        }
      }
      
      // Se nenhuma palavra-chave bateu, retorna resposta genérica
      return '🤔 Não entendi totalmente. Tente perguntar sobre: cadastro, privacidade, mapa, avaliações, preços, segurança ou erros.';
    }

    // Envia mensagem do usuário e gera resposta do bot
    function sendMessage() {
      const text = $input.val().trim();
      if(!text) return; // Ignora mensagens vazias

      // Adiciona mensagem do usuário ao histórico
      history.push({ role: 'user', text: text });
      LS.set('helpChatHistory', history);
      renderChat();
      $input.val(''); // Limpa campo de digitação

      // Bot responde após pequeno delay (parece mais natural!)
      setTimeout(() => {
        const botAnswer = getBotResponse(text);
        history.push({ role: 'bot', text: botAnswer });
        LS.set('helpChatHistory', history);
        renderChat();
      }, 400); // 400ms = menos de meio segundo
    }
    
    // Botão de enviar mensagem
    $chat.find('button[data-send]').on('click', sendMessage);
    
    // Permite enviar com tecla Enter
    $input.on('keypress', function(e) {
      if(e.which === 13) { // 13 = Enter
        e.preventDefault();
        sendMessage();
      }
    });

    // Botões de perguntas rápidas (respostas prontas)
    $chat.find('[data-quick]').on('click', function() {
      $input.val($(this).text()); // Coloca texto no campo
      sendMessage();               // Envia automaticamente
    });

    // Botão de limpar histórico
    $chat.find('[data-clear]').on('click', function() {
      if(confirm('Deseja limpar todo o histórico do chat?')) {
        history.length = 0; // Esvazia array
        LS.set('helpChatHistory', history);
        renderChat();
      }
    });

    renderChat(); // Exibe histórico salvo ao abrir página
  }

})(jQuery);

