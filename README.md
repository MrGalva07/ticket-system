🎟️ Sistema de Gerenciamento de Tickets

Um sistema completo para gerenciamento de tickets com status (Aberto/Em Progresso/Concluído), desenvolvido com React, TypeScript e Tailwind CSS.

✨ Deploy
O sistema está disponível em produção através da Vercel:
https://ticket-system-drab.vercel.app

🚀 Funcionalidades Principais
CRUD Completo de tickets

Filtragem inteligente por status

Interface responsiva que se adapta a dispositivos móveis e desktop

Modal de confirmação para ações importantes

Persistência local dos dados

Atualização em tempo real do status

🛠 Tecnologias Utilizadas
Frontend:

React 18

TypeScript

Vite

Tailwind CSS

React Icons

Ferramentas:

ESLint

Prettier

Git

📦 Como Executar Localmente
Pré-requisitos
Node.js (v18 ou superior)

npm (v9 ou superior) ou yarn

Instalação
# Clone o repositório
git clone https://github.com/MrGalva07/ticket-system.git

# Acesse o diretório
cd ticket-system

# Instale as dependências
npm install
# ou
yarn install

# Ambiente de desenvolvimento
npm run dev
# ou
yarn dev

# Build para produção
npm run build
# ou
yarn build

🎨 Estrutura do Projeto

src/
├── components/
│   ├── TicketCard.tsx       # Componente de card individual
│   ├── TicketCardList.tsx   # Listagem de tickets (mobile)
│   ├── TicketTable.tsx      # Tabela de tickets (desktop)
│   ├── ConfirmationModal.tsx # Modal de confirmação
│   └── ...
├── types/
│   └── ticket.ts            # Tipos TypeScript
├── App.tsx                  # Componente principal
└── main.tsx                 # Ponto de entrada


📝 Guia de Uso
Adicionar Ticket:

Clique em "Criar Novo Ticket"

Preencha os campos obrigatórios

Confirme para adicionar

Atualizar Status:

Selecione novo status no dropdown

O sistema atualiza automaticamente

Visualizar Detalhes:

Clique no título do ticket

Excluir Ticket:

Clique em "Excluir"

Confirme no modal de confirmação
