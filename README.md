# CodeForge - Clientes

Site institucional da CodeForge, empresa especializada em desenvolvimento de bots e sites.

## 🚀 Deploy no Netlify

### Método 1: Deploy Automático (Recomendado)

1. **Conecte seu repositório no Netlify:**
   - Acesse [netlify.com](https://netlify.com)
   - Faça login e clique em "New site from Git"
   - Conecte seu repositório do GitHub/GitLab/Bitbucket
   - Configure as seguintes opções:
     - **Build command:** `npm run build`
     - **Publish directory:** `out`
     - **Node version:** `18`

2. **Configurações de Build:**
   - O arquivo `netlify.toml` já está configurado
   - O Next.js está configurado para exportação estática
   - A pasta `out` será gerada automaticamente

### Método 2: Deploy Manual

1. **Gere a build estática:**
   ```bash
   npm install
   npm run build
   ```

2. **Faça upload da pasta `out`:**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git" → "Deploy manually"
   - Arraste a pasta `out` para a área de upload

## 📁 Estrutura do Projeto

```
CodeForgeClients/
├── app/                    # Páginas do Next.js
├── components/             # Componentes React
├── public/                 # Arquivos estáticos
├── out/                    # Build estática (gerada)
├── netlify.toml           # Configuração do Netlify
└── next.config.mjs        # Configuração do Next.js
```

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Radix UI** - Componentes acessíveis

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run lint` - Verificação de código

## 🌐 URLs do Site

- **Home:** `/`
- **Bots:** `/bots`
- **Sites:** `/sites`
- **Design:** `/design`
- **Planos:** `/planos`
- **Contato:** `/contato`
- **Ajuda:** `/ajuda`

## 🔧 Configurações Especiais

- **Exportação Estática:** Configurada para funcionar sem servidor
- **Imagens:** Otimizadas para deploy estático
- **SEO:** Meta tags configuradas
- **Performance:** Otimizada para carregamento rápido

## 📞 Suporte

Para dúvidas sobre o deploy ou desenvolvimento:
- **Discord:** [https://discord.gg/jp2BzA4H](https://discord.gg/jp2BzA4H)
- **Email:** contato@codeforge.dev
