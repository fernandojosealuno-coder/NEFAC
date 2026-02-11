# MVP em Forma de React - NEFAC

Aplicação web desenvolvida em React + Vite para o NEFAC (Núcleo de Estudos em Família e Cronicidade).

## 🚀 Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages através de GitHub Actions.

### URL do Site

O site está disponível em: https://fernandojosealuno-coder.github.io/MVPemFormadeReact/

### Como Funciona o Deploy

1. **Automaticamente**: Sempre que houver um push na branch `main`, o GitHub Actions irá:
   - Instalar as dependências
   - Fazer o build da aplicação
   - Fazer deploy no GitHub Pages

2. **Manualmente**: Você também pode disparar o deploy manualmente através da aba "Actions" no GitHub.

### Configurações Importantes

#### 1. Vite Config (`mvpnefacweb/vite.config.js`)
```javascript
export default defineConfig({
  base: "/MVPemFormadeReact/",
  plugins: [react()],
});
```
O `base` deve corresponder ao nome do repositório para que os caminhos dos assets funcionem corretamente.

#### 2. BrowserRouter (`mvpnefacweb/src/main.jsx`)
```javascript
<BrowserRouter basename="/MVPemFormadeReact">
  <App />
</BrowserRouter>
```
O `basename` deve ser configurado para que o React Router funcione corretamente no GitHub Pages.

#### 3. Arquivo .nojekyll
O arquivo `.nojekyll` na pasta `public` garante que o GitHub Pages não processe a aplicação com Jekyll, permitindo que arquivos e pastas iniciados com underscore (`_`) sejam servidos corretamente.

### Configuração do GitHub Pages

**IMPORTANTE:** Você precisa configurar o repositório para usar GitHub Actions antes que o deploy funcione:

1. Vá em **Settings** → **Pages** no repositório GitHub
2. Em **Build and deployment**:
   - Na seção **Source**, selecione **GitHub Actions** (não "Deploy from a branch")
3. Salve as configurações
4. Faça o merge deste PR para a branch `main`
5. O workflow será executado automaticamente e o site estará disponível em poucos minutos

⚠️ **Sem esta configuração, o workflow não conseguirá fazer o deploy e mostrará erro "action_required"**

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 20 ou superior
- npm

### Instalação

```bash
cd mvpnefacweb
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build de Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist`.

### Preview do Build

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
MVPemFormadeReact/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── mvpnefacweb/                # Aplicação React
│   ├── public/                 # Assets estáticos
│   │   ├── .nojekyll          # Arquivo para GitHub Pages
│   │   ├── fotos/             # Imagens do site
│   │   └── insta/             # Imagens do Instagram
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── data/              # Dados estáticos
│   │   └── styles/            # Estilos CSS
│   └── vite.config.js         # Configuração do Vite
└── README.md
```

## 🔧 Solução de Problemas

### Workflow com status "action_required"

Se o workflow do GitHub Actions mostrar o status "action_required":

1. **Configure GitHub Pages corretamente**:
   - Vá em **Settings** → **Pages**
   - Em **Build and deployment** → **Source**, selecione **GitHub Actions**
   - NÃO use "Deploy from a branch"
2. **Confirme as permissões**: O repositório deve permitir GitHub Actions com permissões de escrita
3. **Execute novamente o workflow**: Após a configuração, vá em Actions e execute manualmente

### Erro 404 no GitHub Pages

Se você encontrar o erro "File not found" no GitHub Pages:

1. **Verifique o `base` no vite.config.js**: Deve ser `/NomeDoRepositorio/`
2. **Verifique o `basename` no BrowserRouter**: Deve ser `/NomeDoRepositorio`
3. **Confirme que o arquivo .nojekyll existe** na pasta `public`
4. **Verifique se o GitHub Actions está habilitado** em Settings → Pages → Source → GitHub Actions
5. **Aguarde o workflow completar**: Pode levar alguns minutos após o push
6. **Verifique se o PR foi mergeado**: As correções só serão aplicadas após merge para `main`

### Assets não carregam

Se imagens ou estilos não carregarem:

1. Verifique se os componentes estão usando `import.meta.env.BASE_URL` para construir os caminhos
2. Confirme que o `base` no vite.config.js está correto
3. Limpe o cache do navegador

## 📝 Licença

Este projeto é mantido pelo NEFAC - Núcleo de Estudos em Família e Cronicidade.
