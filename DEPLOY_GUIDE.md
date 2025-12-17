# Guia de Deploy no GitHub Pages

Este guia explica passo a passo como configurar e fazer deploy da aplicação no GitHub Pages.

## 🚨 Problema Resolvido

O erro "File not found" ocorria porque:
- O React Router não tinha o `basename` configurado
- O código antigo estava sendo servido da branch `gh-pages`
- O repositório não estava configurado para usar GitHub Actions

## ✅ Solução Implementada

### 1. Correção no Código

**Arquivo: `mvpnefacweb/src/main.jsx`**
```jsx
<BrowserRouter basename="/MVPemFormadeReact">
  <App />
</BrowserRouter>
```

Isso garante que todas as rotas funcionem corretamente quando a aplicação está hospedada em `/MVPemFormadeReact/`.

### 2. Workflow de Deploy Automático

Foi criado o arquivo `.github/workflows/deploy.yml` que:
- Instala as dependências
- Faz build da aplicação
- Faz deploy automático no GitHub Pages

### 3. Arquivo .nojekyll

Adicionado na pasta `public` para evitar que o GitHub Pages processe a aplicação com Jekyll.

## 📋 Como Fazer Funcionar

### Passo 1: Configurar GitHub Pages

1. Acesse o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Na seção **Build and deployment**:
   - **Source**: Selecione **GitHub Actions**
   - ⚠️ NÃO selecione "Deploy from a branch"
5. Salve as configurações

![Configuração do GitHub Pages](https://docs.github.com/assets/cb-49110/mw-1440/images/help/pages/select-github-actions-source.webp)

### Passo 2: Fazer Merge do PR

1. Revise as mudanças neste Pull Request
2. Clique em **Merge pull request**
3. Confirme o merge

### Passo 3: Aguardar o Deploy

1. Vá na aba **Actions** do repositório
2. Você verá o workflow "Deploy to GitHub Pages" em execução
3. Aguarde a conclusão (geralmente 2-3 minutos)
4. O status ficará verde ✅ quando concluído

### Passo 4: Acessar o Site

Após o deploy concluir, acesse:
**https://fernandojosealuno-coder.github.io/MVPemFormadeReact/**

## 🔍 Verificando se Está Funcionando

Você saberá que está funcionando quando:
- ✅ A página inicial carrega sem erros 404
- ✅ Você pode navegar entre as páginas (Home, Notícias, Equipe, Galeria, Contato)
- ✅ As imagens aparecem corretamente
- ✅ O menu de navegação funciona

## ⚠️ Erros Comuns

### Erro: "action_required" no workflow

**Causa:** GitHub Pages não está configurado para usar GitHub Actions

**Solução:** 
1. Vá em Settings → Pages
2. Mude Source para "GitHub Actions"
3. Execute o workflow novamente

### Erro: Páginas mostram 404 ao navegar

**Causa:** O basename do React Router não está configurado

**Solução:** Já foi corrigido neste PR! Verifique o arquivo `mvpnefacweb/src/main.jsx`

### Erro: Imagens não aparecem

**Causa:** Caminhos de imagens não estão usando BASE_URL

**Solução:** Já foi corrigido! Os componentes usam `import.meta.env.BASE_URL`

## 🔄 Deploys Futuros

Após a configuração inicial, qualquer push para a branch `main` irá:
1. Disparar o workflow automaticamente
2. Fazer build da aplicação
3. Fazer deploy no GitHub Pages

Não é necessário fazer nada manualmente!

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do workflow na aba Actions
2. Confirme que a configuração do GitHub Pages está correta
3. Verifique se há erros de build no log do workflow
4. Certifique-se de que o PR foi mergeado para `main`

## ✨ Resumo

1. ✅ Código corrigido com basename
2. ✅ Workflow de deploy criado
3. ⏳ **Você precisa**: Configurar Settings → Pages → Source → GitHub Actions
4. ⏳ **Você precisa**: Fazer merge deste PR
5. 🎉 Pronto! O site funcionará automaticamente
