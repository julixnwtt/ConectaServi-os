# 📋 ConectaServiços - Sistema Local (Sem Servidor)

## ✅ O que foi feito?

O sistema agora funciona **100% no navegador**, sem precisar de servidor Node.js!

### Arquivos criados/modificados:

1. **`assets/js/auth-local.js`** ✨ (NOVO)
   - Sistema de autenticação local usando LocalStorage
   - Registra usuários, faz login, gerencia sessões
   - Não precisa de servidor rodando

2. **`cadastro-cliente.html`** 
   - Atualizado para usar `AuthLocal` ao invés de servidor
   - Cadastro funciona instantaneamente

3. **`cadastro-prestador.html`**
   - Atualizado para usar `AuthLocal` ao invés de servidor
   - Cadastro de prestadores funciona localmente

4. **`cadastro.html`** (Login)
   - Atualizado para usar `AuthLocal` ao invés de servidor
   - Login funciona sem conexão

---

## 🚀 Como usar?

### 1. Abrir o site
Simplesmente abra qualquer arquivo `.html` no navegador:
- **index.html** - Página inicial
- **home.html** - Página principal
- **cadastro-cliente.html** - Cadastro de clientes
- **cadastro-prestador.html** - Cadastro de prestadores
- **cadastro.html** - Login

### 2. Testar cadastro
1. Vá em `cadastro-cliente.html` ou `cadastro-prestador.html`
2. Preencha o formulário
3. Clique em "Cadastrar"
4. Você será redirecionado para `home.html` automaticamente!

### 3. Testar login
**Usuários pré-cadastrados para teste:**

| Email | Senha | Tipo |
|-------|-------|------|
| maria@email.com | 123456 | Prestador (Diarista) |
| joao@email.com | 123456 | Prestador (Eletricista) |
| ana@email.com | 123456 | Prestador (Cabeleireira) |
| carlos@email.com | 123456 | Prestador (Programador) |
| paula@email.com | 123456 | Prestador (Babá de animais) |
| cliente@email.com | 123456 | Cliente |

---

## 🔧 Como funciona?

### LocalStorage (Armazenamento do Navegador)
Todos os dados são salvos no navegador usando `localStorage`:

- **Usuários cadastrados**: `localStorage.getItem('usuarios')`
- **Token de sessão**: `localStorage.getItem('token')`
- **Usuário logado**: `localStorage.getItem('user')`

### Funções disponíveis

```javascript
// Registrar novo usuário
AuthLocal.registro(dados)

// Fazer login
AuthLocal.login(email, senha)

// Fazer logout
AuthLocal.logout()

// Obter usuário logado
AuthLocal.getUsuarioLogado()

// Deletar conta
AuthLocal.deletarConta()

// Listar todos os usuários
AuthLocal.getUsuarios()
```

---

## 🎯 Vantagens do sistema local

✅ **Não precisa instalar Node.js**
✅ **Não precisa servidor rodando**
✅ **Funciona offline**
✅ **Rápido e simples**
✅ **Perfeito para protótipo/demonstração**

---

## ⚠️ Limitações

❌ **Os dados são salvos apenas no navegador**
   - Se limpar o cache/cookies, perde os dados
   - Cada navegador tem dados separados
   - Não sincroniza entre dispositivos

❌ **Não é seguro para produção**
   - Senhas não são criptografadas
   - Qualquer pessoa pode ver os dados no console

---

## 🔄 Migrar para servidor (futuramente)

Se quiser usar servidor Node.js no futuro:

1. Instale o Node.js: https://nodejs.org/
2. Abra o terminal na pasta `assets/js`
3. Execute:
   ```bash
   npm install
   node server.js
   ```
4. Troque `auth-local.js` por chamadas fetch para `http://localhost:3000`

---

## 💡 Dicas

- **Limpar dados**: Abra o Console do navegador (F12) e digite:
  ```javascript
  localStorage.clear()
  ```

- **Ver dados salvos**: No Console digite:
  ```javascript
  console.log(localStorage.getItem('usuarios'))
  console.log(localStorage.getItem('user'))
  ```

- **Testar rapidamente**: Use os usuários pré-cadastrados da tabela acima

---

## 📞 Suporte

Se tiver dúvidas ou problemas:
1. Abra o Console do navegador (F12)
2. Veja se há erros em vermelho
3. Verifique se `auth-local.js` está carregando
4. Teste com os usuários pré-cadastrados

**Pronto para usar! Não precisa fazer mais nada! 🎉**
