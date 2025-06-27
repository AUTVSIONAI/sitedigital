# DInfluencer - Conectando Marcas e Influenciadores Digitais

DInfluencer é uma plataforma que conecta marcas e influenciadores digitais, facilitando parcerias e colaborações eficientes.

## Funcionalidades

- Cadastro de marcas e influenciadores
- Perfis detalhados com métricas e informações relevantes
- Sistema de busca avançada para encontrar parcerias ideais
- Mensagens diretas entre marcas e influenciadores
- Gerenciamento de campanhas e colaborações
- Análise de desempenho de campanhas
- Configurações de conta e preferências
- Centro de ajuda e suporte

## Tecnologias Utilizadas

- React
- TypeScript
- Material UI
- React Router
- Axios

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

## Estrutura do Projeto

- `/src/components` - Componentes reutilizáveis
  - `/Header` - Componente de cabeçalho com navegação
  - `/Footer` - Componente de rodapé com links
  - `/Layout` - Layout principal da aplicação
- `/src/pages` - Páginas da aplicação
  - `/HomePage` - Página inicial
  - `/LoginPage` - Página de login
  - `/RegisterPage` - Página de registro
  - `/BrandDashboard` - Dashboard para marcas
  - `/InfluencerDashboard` - Dashboard para influenciadores
  - `/SearchPage` - Página de busca
  - `/CampaignPage` - Página de gerenciamento de campanhas
  - `/MessagesPage` - Sistema de mensagens
  - `/SettingsPage` - Configurações de conta
  - `/HelpPage` - Centro de ajuda e suporte
  - `/NotFoundPage` - Página 404
- `/src/services` - Serviços para comunicação com APIs
- `/src/types` - Definições de tipos TypeScript
- `/src/utils` - Funções utilitárias
- `/src/contexts` - Contextos React para gerenciamento de estado
  - `AuthContext` - Contexto de autenticação

## Licença

MIT