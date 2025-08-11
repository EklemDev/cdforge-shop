# 🚀 Guia de Deploy - CodeForge

## 📋 Pré-requisitos

1. **Conta no Firebase** (já configurado)
2. **Domínio** (ex: codeforge.dev)
3. **Provedor de hospedagem** (Netlify, Vercel, ou servidor próprio)

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.production` com:

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

### 2. Build do Projeto

```bash
npm run build
```

O build será gerado na pasta `out/`

## 🌐 Opções de Deploy

### Opção 1: Netlify (Recomendado)

1. **Conecte seu repositório** no Netlify
2. **Configure o build:**
   - Build command: `npm run build`
   - Publish directory: `out`
3. **Configure as variáveis de ambiente** no painel do Netlify
4. **Configure o domínio personalizado**

### Opção 2: Vercel

1. **Conecte seu repositório** no Vercel
2. **Configure o projeto** automaticamente
3. **Configure as variáveis de ambiente**
4. **Configure o domínio personalizado**

### Opção 3: Servidor Próprio

1. **Faça o build:**
   ```bash
   npm run build
   ```

2. **Faça upload** da pasta `out/` para seu servidor

3. **Configure o servidor web** (Apache/Nginx) para servir os arquivos estáticos

## 🔗 Configuração do Domínio

### DNS Records

Configure os seguintes registros DNS:

```
A     @      [IP_DO_SERVIDOR]
CNAME www    [seu-dominio.com]
```

### SSL/HTTPS

- **Netlify/Vercel:** Automático
- **Servidor próprio:** Configure certificado SSL (Let's Encrypt)

## 📱 Pós-Deploy

1. **Teste todas as funcionalidades:**
   - Formulários de contato
   - DEV panel (chave: Mllk1227)
   - Sincronização do Firebase
   - Links e navegação

2. **Configure o Firebase:**
   - Adicione seu domínio aos domínios autorizados
   - Configure as regras de segurança

3. **SEO e Analytics:**
   - Configure Google Analytics
   - Configure Google Search Console
   - Teste a velocidade do site

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Inicializar Firebase
npm run init-firebase

# Deploy
npm run deploy
```

## 🔒 Segurança

1. **Firebase Rules** - Configure as regras de segurança
2. **HTTPS** - Sempre use HTTPS em produção
3. **Headers de Segurança** - Configure headers de segurança no servidor

## 📞 Suporte

Em caso de problemas:
1. Verifique os logs do build
2. Teste localmente primeiro
3. Verifique as configurações do Firebase
4. Teste a conectividade com o banco de dados

---

**🎉 Seu site estará online e funcionando perfeitamente!**
