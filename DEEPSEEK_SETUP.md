# Configuração do DeepSeek para Automações

## 1. Obter API Key do DeepSeek

1. Acesse [https://platform.deepseek.com/](https://platform.deepseek.com/)
2. Crie uma conta ou faça login
3. Vá para a seção de API Keys
4. Crie uma nova API Key
5. Copie a chave gerada

## 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# DeepSeek API Configuration
DEEPSEEK_API_KEY=sua_chave_api_aqui

# Outras configurações
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. Funcionalidades Disponíveis

### Automações Implementadas:

1. **Análise de Pedidos**
   - Analisa pedidos automaticamente
   - Sugere prioridades
   - Estima tempo de desenvolvimento
   - Identifica recursos necessários

2. **Suporte ao Cliente**
   - Gera respostas automáticas
   - Personaliza mensagens
   - Mantém tom profissional

3. **Geração de Conteúdo**
   - Cria artigos para o site
   - Otimiza para SEO
   - Foca em desenvolvimento de bots e sites

4. **Revisão de Código**
   - Analisa qualidade do código
   - Sugere melhorias
   - Identifica possíveis bugs

5. **Automação Personalizada**
   - Permite prompts customizados
   - Flexibilidade total para tarefas específicas

## 4. Como Usar

### No Painel Administrativo:

1. Acesse `/admin` com sua chave de desenvolvedor
2. Vá para a aba "Automação"
3. Escolha o tipo de automação desejada
4. Configure os parâmetros
5. Execute a automação

### Ações Rápidas Disponíveis:

- **Analisar Pedidos Pendentes**: Analisa todos os pedidos pendentes e sugere prioridades
- **Gerar Resposta de Boas-vindas**: Cria mensagem profissional para novos clientes
- **Criar Conteúdo sobre Bots**: Gera artigo sobre benefícios de bots para empresas

## 5. Exemplos de Uso

### Análise de Pedido:
```typescript
const response = await analyzeOrder(orderData)
// Retorna análise detalhada com prioridade, estimativa de tempo, etc.
```

### Geração de Resposta para Cliente:
```typescript
const response = await generateCustomerResponse(
  "Preciso de um bot para meu servidor Discord",
  orderContext
)
// Retorna resposta profissional e específica
```

### Geração de Conteúdo:
```typescript
const response = await generateContent(
  "artigo",
  "Benefícios de bots para empresas",
  "Foco em automação e produtividade"
)
// Retorna artigo otimizado para SEO
```

## 6. Custos e Limites

- Verifique os preços atuais em: [https://platform.deepseek.com/pricing](https://platform.deepseek.com/pricing)
- Configure limites de uso conforme necessário
- Monitore o uso através das estatísticas no painel

## 7. Segurança

- Nunca compartilhe sua API Key
- Use variáveis de ambiente para configuração
- Implemente rate limiting se necessário
- Monitore logs de uso

## 8. Troubleshooting

### Erro: "DEEPSEEK_API_KEY não configurada"
- Verifique se o arquivo `.env.local` existe
- Confirme se a variável está corretamente definida
- Reinicie o servidor após adicionar a variável

### Erro: "Erro na comunicação"
- Verifique sua conexão com a internet
- Confirme se a API Key é válida
- Verifique os logs do servidor

### Resposta vazia ou erro
- Verifique se o prompt está claro e específico
- Ajuste os parâmetros de temperatura e max_tokens
- Teste com prompts mais simples primeiro

## 9. Próximos Passos

- Implementar cache de respostas
- Adicionar mais tipos de automação
- Criar templates de prompts
- Implementar histórico de automações
- Adicionar métricas de uso e custos
