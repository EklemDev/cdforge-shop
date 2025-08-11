# 🚀 Guia Completo: Como Conseguir APIs Gratuitas

## 📋 **APIs Recomendadas (Gratuitas)**

### **1. 🥇 Google Gemini (RECOMENDADO)**
- **URL:** https://makersuite.google.com/app/apikey
- **Limite:** 15 requests/minuto (totalmente gratuito)
- **Qualidade:** Excelente
- **Como conseguir:**
  1. Acesse: https://makersuite.google.com/app/apikey
  2. Faça login com sua conta Google
  3. Clique em "Create API Key"
  4. Copie a chave (exemplo: `AIzaSyC...`)
  5. Adicione no `.env.local`: `GEMINI_API_KEY=sua_chave_aqui`

### **2. 🥈 OpenAI (ChatGPT)**
- **URL:** https://platform.openai.com/
- **Limite:** $5 de crédito (cerca de 1000+ mensagens)
- **Qualidade:** Excelente
- **Como conseguir:**
  1. Acesse: https://platform.openai.com/
  2. Clique em "Sign up"
  3. Crie uma conta
  4. Vá em "API Keys" → "Create new secret key"
  5. Copie a chave (começa com `sk-`)
  6. Adicione no `.env.local`: `OPENAI_API_KEY=sua_chave_aqui`

### **3. 🥉 Anthropic (Claude)**
- **URL:** https://console.anthropic.com/
- **Limite:** $5 de crédito
- **Qualidade:** Muito boa
- **Como conseguir:**
  1. Acesse: https://console.anthropic.com/
  2. Crie uma conta
  3. Vá em "API Keys"
  4. Gere uma nova chave
  5. Adicione no `.env.local`: `ANTHROPIC_API_KEY=sua_chave_aqui`

### **4. DeepSeek (Que já tentamos)**
- **URL:** https://platform.deepseek.com/
- **Limite:** 1000 tokens/dia
- **Qualidade:** Boa
- **Como conseguir:**
  1. Acesse: https://platform.deepseek.com/
  2. Faça login/cadastro
  3. Vá em "API Keys"
  4. Crie uma nova chave
  5. Adicione no `.env.local`: `DEEPSEEK_API_KEY=sua_chave_aqui`

## 🔧 **Como Configurar no Projeto**

### **Passo 1: Escolha uma API**
Recomendo começar com **Google Gemini** (totalmente gratuito e funciona bem).

### **Passo 2: Configure a chave**
```bash
# Adicione no arquivo .env.local
GEMINI_API_KEY=AIzaSyC...sua_chave_aqui
```

### **Passo 3: Teste a API**
```bash
# Inicie o servidor
npm run dev

# Teste no navegador
http://localhost:3001
```

## 🎯 **Qual API Escolher?**

| API | Gratuito | Limite | Qualidade | Facilidade |
|-----|----------|--------|-----------|------------|
| **Google Gemini** | ✅ Sim | 15/min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **OpenAI** | ✅ $5 crédito | 1000+ msgs | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Anthropic** | ✅ $5 crédito | 1000+ msgs | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **DeepSeek** | ✅ 1000 tokens/dia | Limitado | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🚀 **Recomendação Final**

**Use Google Gemini** porque:
- ✅ **Totalmente gratuito**
- ✅ **Sem limite de tempo**
- ✅ **Qualidade excelente**
- ✅ **Fácil de configurar**
- ✅ **Suporte a português**

## 📝 **Exemplo de Configuração**

```bash
# .env.local
GEMINI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

## 🔍 **Como Testar**

1. **Configure a API key**
2. **Inicie o servidor:** `npm run dev`
3. **Acesse:** http://localhost:3001
4. **Clique no botão DIGAE**
5. **Faça uma pergunta**
6. **Veja se funciona!**

## 🆘 **Problemas Comuns**

### **Erro: "API key não configurada"**
- Verifique se a chave está no `.env.local`
- Reinicie o servidor após adicionar a chave

### **Erro: "Limite excedido"**
- Tente outra API da lista
- Ou aguarde o reset do limite

### **Erro: "Conexão falhou"**
- Verifique sua internet
- Tente novamente em alguns minutos

## 💡 **Dicas**

1. **Comece com Google Gemini** - é o mais fácil
2. **Tenha backup** - configure 2-3 APIs diferentes
3. **Teste sempre** - verifique se funciona antes de usar
4. **Monitore uso** - acompanhe os limites gratuitos

---

**🎉 Agora você tem todas as informações para conseguir uma API funcional e gratuita!**
