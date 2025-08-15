# 🍔 FSW Donalds - Sistema de Pedidos para Restaurante

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-6.2.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
</div>

<div align="center">
  <h3>🚀 Sistema completo de pedidos online para restaurantes</h3>
  <p>Uma aplicação moderna e responsiva para gerenciar pedidos de restaurante com interface intuitiva e experiência otimizada para mobile.</p>
</div>

---

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [🏗️ Arquitetura](#️-arquitetura)
- [📱 Interface](#-interface)
- [🚀 Como Executar](#-como-executar)
- [📊 Banco de Dados](#-banco-de-dados)
- [🎯 Funcionalidades Detalhadas](#-funcionalidades-detalhadas)
- [📝 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Configuração](#-configuração)
- [📸 Screenshots](#-screenshots)
- [🤝 Contribuição](#-contribuição)

---

## ✨ Funcionalidades

### 🍽️ **Sistema de Restaurante Completo**
- **Multi-restaurante**: Suporte a múltiplos restaurantes via slug único
- **Cardápio Dinâmico**: Categorias e produtos organizados e filtráveis
- **Métodos de Consumo**: Opções para "Comer no Local" ou "Para Levar"

### 🛒 **Carrinho de Compras Avançado**
- **Gerenciamento de Estado**: Context API para estado global do carrinho
- **Operações CRUD**: Adicionar, remover, aumentar/diminuir quantidade
- **Persistência**: Mantém itens durante a navegação
- **Validação**: Verificação de produtos e quantidades

### 📋 **Sistema de Pedidos**
- **Validação de CPF**: Algoritmo brasileiro completo para validação
- **Formulários Inteligentes**: Validação com Zod e React Hook Form
- **Estados do Pedido**: PENDING, IN_PREPARATION, READY_FOR_PICKUP, COMPLETED, CANCELLED
- **Histórico**: Consulta de pedidos por CPF

### 🎨 **Interface Moderna**
- **Design Responsivo**: Mobile-first com Tailwind CSS
- **Componentes Reutilizáveis**: shadcn/ui para consistência
- **Feedback Visual**: Loading states, toasts e animações
- **UX Otimizada**: Drawer/Modal para mobile, navegação intuitiva

---

## 🛠️ Tecnologias

### **Frontend**
- **[Next.js 15.1.6](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de interface modernos

### **Backend & Database**
- **[Prisma 6.2.1](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **Server Actions** - API routes com Next.js 15

### **Formulários & Validação**
- **[React Hook Form 7.62.0](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod 4.0.17](https://zod.dev/)** - Validação de esquemas TypeScript
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração Zod + RHF

### **UI/UX**
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Vaul](https://vaul.dev/)** - Drawer/Modal components
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[React Number Format](https://s-yadav.github.io/react-number-format/)** - Formatação de inputs

### **Desenvolvimento**
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação de código
- **[PostCSS](https://postcss.org/)** - Processamento CSS

---

## 🏗️ Arquitetura

### **Padrões de Design**
- **Server Components**: Renderização no servidor para performance
- **Client Components**: Interatividade onde necessário
- **Context API**: Gerenciamento de estado global
- **Server Actions**: Operações de banco seguras
- **Type Safety**: TypeScript em toda aplicação

### **Estrutura de Rotas**
```
/[slug]                    # Página inicial do restaurante
/[slug]/menu               # Cardápio com produtos
/[slug]/menu/[productId]   # Detalhes do produto
/[slug]/orders             # Histórico de pedidos
```

### **Banco de Dados - Modelo Relacional**
```
Restaurant (1) ─── (N) MenuCategory (1) ─── (N) Product
     │                                           │
     │                                           │
     └─── (N) Order (1) ─── (N) OrderProduct ───┘
```

---

## 📱 Interface

### **🎨 Design System**
- **Cores**: Sistema de cores baseado em CSS Variables
- **Tipografia**: Font Poppins com pesos variados
- **Componentes**: shadcn/ui para consistência
- **Responsividade**: Mobile-first approach

### **📲 Experiência Mobile**
- **Drawer Navigation**: Navegação tipo app nativo
- **Touch Friendly**: Botões e áreas de toque otimizadas
- **Loading States**: Feedback visual em todas operações
- **Error Handling**: Tratamento elegante de erros

---

## 🚀 Como Executar

### **📋 Pré-requisitos**
- Node.js 18+ 
- PostgreSQL
- npm ou yarn

### **🔧 Instalação**

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/fullstackweek-donalds.git
cd fullstackweek-donalds
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Adicione suas variáveis no `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/fsw_donalds"
```

4. **Configure o banco de dados**
```bash
# Gera o cliente Prisma
npx prisma generate

# Executa as migrations
npx prisma migrate dev

# Popula o banco com dados iniciais
npx prisma db seed
```

5. **Execute a aplicação**
```bash
npm run dev
# ou
yarn dev
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

---

## 📊 Banco de Dados

### **🗂️ Modelos Principais**

#### **Restaurant**
```typescript
{
  id: string              // UUID único
  name: string           // Nome do restaurante
  slug: string           // URL amigável (único)
  description: string    // Descrição
  avatarImageUrl: string // Logo do restaurante
  coverImageUrl: string  // Imagem de capa
}
```

#### **Product**
```typescript
{
  id: string              // UUID único
  name: string           // Nome do produto
  description: string    // Descrição detalhada
  price: number          // Preço em reais
  imageUrl: string       // Imagem do produto
  ingredients: string[]  // Lista de ingredientes
}
```

#### **Order**
```typescript
{
  id: number                    // ID incremental
  total: number                // Valor total
  status: OrderStatus          // Status do pedido
  consumptionMethod: string    // DINE_IN | TAKE_AWAY
  customerName: string         // Nome do cliente
  customerCpf: string         // CPF do cliente
}
```

### **📈 Estados do Pedido**
- `PENDING` - Aguardando confirmação
- `IN_PREPARATION` - Em preparo
- `READY_FOR_PICKUP` - Pronto para retirada
- `COMPLETED` - Finalizado
- `CANCELLED` - Cancelado

---

## 🎯 Funcionalidades Detalhadas

### **🏪 Seleção de Restaurante**
- Acesso via slug único (`/mcdonalds`, `/burger-king`)
- Informações do restaurante (logo, nome, descrição)
- Escolha do método de consumo

### **📱 Navegação do Cardápio**
- Categorias horizontais com scroll
- Produtos organizados por categoria
- Imagens, preços e descrições
- Ingredientes detalhados

### **🛒 Gerenciamento do Carrinho**
- Adicionar produtos com quantidade
- Modificar quantidades (+ / -)
- Remover produtos
- Cálculo automático do total
- Persistência durante navegação

### **📝 Finalização do Pedido**
- Formulário com validação
- Validação de CPF brasileira
- Formatação automática de campos
- Loading states e feedback
- Redirecionamento para acompanhamento

### **📋 Acompanhamento de Pedidos**
- Busca por CPF
- Histórico completo
- Status em tempo real
- Detalhes dos produtos
- Informações do restaurante

---

## 📝 Estrutura do Projeto

```
src/
├── app/                          # App Router (Next.js 15)
│   ├── [slug]/                   # Rotas dinâmicas por restaurante
│   │   ├── page.tsx             # Página inicial do restaurante
│   │   ├── menu/                # Cardápio
│   │   │   ├── page.tsx         # Lista de produtos
│   │   │   ├── [productId]/     # Detalhes do produto
│   │   │   ├── actions/         # Server Actions
│   │   │   ├── components/      # Componentes do menu
│   │   │   ├── contexts/        # Context API (Cart)
│   │   │   ├── helpers/         # Utilitários (CPF)
│   │   │   └── hooks/           # Custom hooks
│   │   └── orders/              # Pedidos
│   │       ├── page.tsx         # Lista de pedidos
│   │       └── components/      # Componentes de pedidos
│   ├── globals.css              # Estilos globais
│   └── layout.tsx               # Layout raiz
├── components/                   # Componentes reutilizáveis
│   └── ui/                      # shadcn/ui components
├── helpers/                     # Funções utilitárias
├── lib/                         # Configurações (Prisma, utils)
└── data/                        # Dados estáticos
```

---

## 🔧 Configuração

### **⚙️ Scripts Disponíveis**

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
```

### **🗄️ Comandos do Prisma**

```bash
npx prisma studio           # Interface visual do banco
npx prisma migrate dev      # Aplica migrations
npx prisma generate         # Gera cliente
npx prisma db seed         # Popula dados iniciais
npx prisma db push         # Sincroniza schema
```

### **🎨 Personalização do Tema**

O projeto usa CSS Variables para temas:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... */
}
```

---

## 📸 Screenshots

### 🏠 **Página Inicial**
- Seleção do restaurante
- Opções de consumo (Comer no local / Para levar)

### 🍔 **Cardápio**
- Navegação por categorias
- Grid de produtos responsivo
- Informações detalhadas

### 🛒 **Carrinho**
- Drawer lateral no mobile
- Gerenciamento de quantidades
- Resumo do pedido

### 📋 **Finalização**
- Formulário de dados do cliente
- Validação em tempo real
- Confirmação do pedido

### 📊 **Pedidos**
- Histórico por CPF
- Status dos pedidos
- Detalhes completos

---

## 🤝 Contribuição

### **🔄 Workflow**
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### **📏 Padrões de Código**
- TypeScript para type safety
- ESLint para qualidade de código
- Prettier para formatação
- Conventional Commits para mensagens

### **🧪 Testes**
```bash
# Adicionar testes unitários
npm run test

# Testes de integração
npm run test:integration
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Desenvolvedor

**Jean Carlos**
- 💼 LinkedIn: [Seu LinkedIn]
- 🐙 GitHub: [Seu GitHub]
- 📧 Email: [Seu Email]

---

<div align="center">
  <p>Feito com ❤️ e muito ☕ durante a Full Stack Week</p>
  <p>🚀 <strong>FSW Donalds</strong> - Transformando a experiência de pedidos online</p>
</div>

---

## 🔗 Links Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)

---

## 📊 Status do Projeto

![GitHub last commit](https://img.shields.io/github/last-commit/seu-usuario/fullstackweek-donalds)
![GitHub issues](https://img.shields.io/github/issues/seu-usuario/fullstackweek-donalds)
![GitHub pull requests](https://img.shields.io/github/issues-pr/seu-usuario/fullstackweek-donalds)
![GitHub stars](https://img.shields.io/github/stars/seu-usuario/fullstackweek-donalds)

**Status**: ✅ Funcional | 🚀 Em Desenvolvimento | 📋 Planejado

- ✅ Sistema de restaurantes multi-tenant
- ✅ Cardápio dinâmico com categorias
- ✅ Carrinho de compras completo
- ✅ Sistema de pedidos com validação
- ✅ Acompanhamento de pedidos por CPF
- ✅ Interface responsiva e moderna
- 🚀 Sistema de notificações
- 🚀 Dashboard administrativo
- 📋 Sistema de avaliações
- 📋 Integração com pagamentos