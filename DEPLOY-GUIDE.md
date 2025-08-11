# 🚀 Deploy do CodeForge - Guia Rápido

## 📋 **Qual é seu domínio?**
- Exemplo: codeforge.dev, codeforge.com.br, etc.

## 🌐 **Opções de Deploy (Escolha uma):**

### **Opção 1: Vercel (RECOMENDADO - 5 minutos)**

1. **Acesse:** https://vercel.com
2. **Faça login** com GitHub/Google
3. **Clique:** "New Project"
4. **Conecte seu repositório** ou faça upload do código
5. **Configure:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Clique:** "Deploy"

**✅ Vantagens:** Gratuito, automático, SSL, CDN global

---

### **Opção 2: Netlify (Alternativa)**

1. **Acesse:** https://netlify.com
2. **Clique:** "New site from Git"
3. **Conecte repositório**
4. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `.next`

---

### **Opção 3: Servidor Próprio**

1. **Faça upload** dos arquivos para seu servidor
2. **Configure Apache/Nginx** para servir o Next.js
3. **Configure domínio** e DNS

## 🔗 **Configuração do Domínio**

### **Após o deploy, configure seu domínio:**

1. **No painel da plataforma** (Vercel/Netlify):
   - Vá em "Settings" > "Domains"
   - Adicione seu domínio personalizado

2. **Configure DNS** no seu provedor de domínio:
   ```
   A     @      76.76.19.19    (Vercel)
   CNAME www    cname.vercel-dns.com
   ```

3. **Aguarde propagação** (5-30 minutos)

## 🔧 **Configurações Importantes**

### **Variáveis de Ambiente:**
```
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

### **Firebase:**
- Adicione seu domínio aos domínios autorizados
- Configure as regras de segurança

## 📱 **Teste Pós-Deploy**

1. **Acesse seu site** pelo domínio
2. **Teste:**
   - ✅ Formulários de contato
   - ✅ DEV panel (chave: Mllk1227)
   - ✅ Sincronização Firebase
   - ✅ Links e navegação

## 🆘 **Problemas Comuns**

### **Build falha:**
- Verifique se todas as dependências estão instaladas
- Verifique se não há erros de TypeScript

### **Domínio não funciona:**
- Aguarde propagação DNS (até 24h)
- Verifique configurações DNS

### **Firebase não conecta:**
- Adicione domínio aos autorizados
- Verifique regras de segurança

---

## 🎯 **Qual opção você quer usar?**

**Recomendo Vercel** - é o mais rápido e fácil!

**Me diga:**
1. Qual é seu domínio?
2. Qual plataforma prefere?
3. Precisa de ajuda com alguma configuração específica?
