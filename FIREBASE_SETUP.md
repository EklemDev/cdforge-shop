# 🔥 Configuração do Firebase - CodeForge

## 📋 Passo a Passo Completo

### 1. Criar Projeto no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Criar Projeto"**
3. Digite o nome: `codeforge-clients` (ou o nome que preferir)
4. Desabilite o Google Analytics (opcional)
5. Clique em **"Criar Projeto"**

### 2. Configurar Firestore Database

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Escolha **"Iniciar no modo de teste"** (para desenvolvimento)
4. Escolha a localização: `us-central1` (ou a mais próxima)
5. Clique em **"Próximo"** e depois **"Concluir"**

### 3. Configurar Regras de Segurança do Firestore

1. Na aba **"Regras"** do Firestore, substitua as regras por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura e escrita na coleção 'clients'
    match /clients/{document} {
      allow read, write: if true; // Para desenvolvimento
    }
    
    // Para produção, use regras mais restritivas:
    // match /clients/{document} {
    //   allow read, write: if request.auth != null;
    // }
  }
}
```

2. Clique em **"Publicar"**

### 4. Configurar Aplicação Web

1. No menu lateral, clique em **"Visão geral do projeto"**
2. Clique no ícone **"</>"** (Adicionar aplicação web)
3. Digite o nome: `CodeForge Web`
4. Marque **"Também configurar o Firebase Hosting"** (opcional)
5. Clique em **"Registrar aplicação"**

### 5. Copiar Configuração

Após registrar a aplicação, você verá um código como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "codeforge-clients.firebaseapp.com",
  projectId: "codeforge-clients",
  storageBucket: "codeforge-clients.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

### 6. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione as seguintes variáveis:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC... (sua api key)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=codeforge-clients.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=codeforge-clients
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=codeforge-clients.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX (se tiver Analytics)
```

### 7. Configurar Netlify (se estiver usando)

1. No painel do Netlify, vá em **"Site settings"**
2. Clique em **"Environment variables"**
3. Adicione todas as variáveis do Firebase com o prefixo `NEXT_PUBLIC_`

### 8. Testar a Configuração

1. Execute o projeto: `npm run dev`
2. Acesse a página de personalização de bots
3. Preencha um formulário e clique em "Enviar Solicitação"
4. Verifique no Firebase Console se os dados foram salvos

## 📊 Estrutura dos Dados

### Coleção: `clients`

Cada documento na coleção `clients` terá a seguinte estrutura:

```javascript
{
  id: "auto-generated",
  name: "Nome do Cliente",
  phone: "Telefone",
  discord: "Discord ID",
  instagram: "Instagram",
  projectType: "bot" | "site" | "design" | "service" | "custom",
  projectDetails: {
    types: ["vendas", "entretenimento"],
    platform: "discord",
    description: "Descrição do projeto",
    features: ["Sistema de comandos", "Banco de dados"],
    budget: "R$ 100 - R$ 200",
    deadline: "1 semana"
  },
  status: "pending" | "in_progress" | "completed" | "cancelled",
  priority: "low" | "medium" | "high",
  assignedTo: "MELKE" | "ZANESCO",
  notes: "Observações adicionais",
  totalValue: 150,
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

## 🔧 Funcionalidades Implementadas

### ✅ Salvamento Automático
- Todos os formulários salvam automaticamente no Firebase
- Dados organizados por tipo de projeto
- Timestamps automáticos

### ✅ Consultas Disponíveis
- Buscar todos os clientes
- Filtrar por status (pendente, em progresso, concluído)
- Filtrar por desenvolvedor (MELKE, ZANESCO)
- Filtrar por tipo de projeto (bot, site, design)

### ✅ Estatísticas
- Total de projetos
- Projetos por status
- Projetos por tipo
- Projetos por desenvolvedor
- Valor total dos projetos

## 🚀 Próximos Passos

### Para o Site dos Desenvolvedores
1. Criar dashboard administrativo
2. Implementar autenticação
3. Adicionar funcionalidades de edição
4. Implementar notificações

### Para Produção
1. Configurar regras de segurança mais restritivas
2. Implementar autenticação de usuários
3. Adicionar validação de dados
4. Configurar backup automático

## 🛠️ Comandos Úteis

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Build estático para Netlify
npm run build:static
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todas as variáveis de ambiente estão configuradas
2. Confirme se as regras do Firestore estão corretas
3. Verifique o console do navegador para erros
4. Teste a conexão com o Firebase Console

---

**Desenvolvido por MELKE & ZANESCO** 🚀
