# 🛍️ Commer

> Uma aplicação moderna de e-commerce whitelabel construída com Vue 3 e TypeScript

[![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## 📋 Sobre o Projeto

**Commer** é uma aplicação de e-commerce whitelabel focada em moda e vestuário. Esta aplicação é responsável pelo catálogo client-side, oferecendo uma experiência de compra moderna, responsiva e intuitiva.

### ⚠️ Status do Projeto

🚧 **Work In Progress** - A aplicação está em desenvolvimento ativo e sujeita a alterações.

## ✨ Funcionalidades

- 🏠 **Página Inicial** com hero banner, categorias em destaque e produtos
- 📦 **Catálogo de Produtos** com filtros e categorias
- 🔍 **Página de Detalhes do Produto** com galeria de imagens, seleção de tamanho/cor e avaliações
- 🛒 **Carrinho de Compras** com gerenciamento de itens
- 📱 **Design Responsivo** otimizado para mobile, tablet e desktop
- 🌙 **Dark Mode** com suporte completo
- ⭐ **Sistema de Avaliações** para produtos
- 🔔 **Notificações Toast** para feedback do usuário
- 🎯 **Navegação Intuitiva** com menu categorizado

## 🚀 Tecnologias

### Core
- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Vite](https://vitejs.dev/)** - Build tool e dev server ultra-rápido
- **[Vue Router](https://router.vuejs.org/)** - Roteamento oficial do Vue
- **[Pinia](https://pinia.vuejs.org/)** - Gerenciamento de estado

### UI/UX
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix Vue](https://www.radix-vue.com/)** - Componentes UI acessíveis e sem estilo
- **[Shadcn Vue](https://www.shadcn-vue.com/)** - Componentes reutilizáveis
- **[Lucide Icons](https://lucide.dev/)** - Ícones modernos
- **[Iconify](https://iconify.design/)** - Framework de ícones unificado
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carrossel leve e extensível
- **[Vue Sonner](https://vue-sonner.vercel.app/)** - Notificações toast elegantes

### Validação & Utilidades
- **[Zod](https://zod.dev/)** - Schema validation TypeScript-first
- **[Vee-Validate](https://vee-validate.logaretm.com/)** - Validação de formulários
- **[VueUse](https://vueuse.org/)** - Coleção de composables essenciais

### Testes & Qualidade
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários
- **[Cypress](https://www.cypress.io/)** - Testes E2E
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/commer.git
cd commer
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
# ou
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Cria build de produção |
| `pnpm preview` | Preview do build de produção |
| `pnpm lint` | Executa o linter |
| `pnpm lint:fix` | Corrige problemas do linter automaticamente |
| `pnpm test:unit` | Executa testes unitários |
| `pnpm test:e2e` | Executa testes E2E |
| `pnpm cy:open` | Abre a interface do Cypress |

## 📁 Estrutura do Projeto

```
commer/
├── src/
│   ├── assets/          # Recursos estáticos (imagens, fontes, etc)
│   ├── blocks/          # Componentes de bloco (ShoppingCart, etc)
│   ├── components/      # Componentes reutilizáveis
│   │   └── ui/          # Componentes UI do Shadcn
│   ├── composables/     # Composables Vue
│   ├── layouts/         # Layouts da aplicação
│   ├── models/          # Tipos e interfaces TypeScript
│   ├── routes/          # Configuração de rotas
│   ├── static/          # Dados estáticos (produtos, navegação)
│   ├── store/           # Stores Pinia
│   ├── utils/           # Funções utilitárias
│   ├── views/           # Páginas/Views
│   │   ├── categories/  # Páginas de categorias
│   │   └── Home/        # Componentes da home
│   ├── App.vue          # Componente raiz
│   └── main.ts          # Entry point
├── public/              # Arquivos públicos
└── tests/               # Testes
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ usando Vue 3 e TypeScript
