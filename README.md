App Fin Mobile - Controle Financeiro Pessoal

Aplicativo mobile desenvolvido em React Native com Expo para controle financeiro pessoal, integrado com backend REST API.

Funcionalidades

- Dashboard - Visão geral do saldo, receitas e despesas
- Transações - Listagem completa de entradas e saídas
- Nova Transação - Formulário para cadastro com categorias, formas de pagamento e parcelamento
- Resumo Financeiro - Gráficos e estatísticas mensais
- Backend Integrado - API REST completa para persistência de dados

Tecnologias

- Frontend: React Native, Expo, React Navigation
- Estilização: React Native Stylesheet
- Navegação: @react-navigation/native e @react-navigation/stack
- HTTP Client: Axios
- Forms: @react-native-picker/picker
- Backend: Node.js + Express (repositório separado)


Como Executar

Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go no celular (para testes mobile)

Instalação
bash
# Clone o repositório
git clone https://github.com/heitorleo27/app-fin-mobile.git
cd app-fin-mobile

# Instale as dependências
npm install
# e
yarn install

# Instale dependências específicas do Expo
npx expo install @react-native-picker/picker react-native-screens react-native-safe-area-context react-native-gesture-handler

Execução

# Inicie o servidor de desenvolvimento
npx expo start

# Escaneie o QR code com Expo Go (Android/iOS)
# Ou pressione:
#   'w' para abrir no navegador
#   'a' para emulador Android
#   'i' para emulador iOS

Backend

O backend deve estar rodando em paralelo:
Link: https://github.com/heitorleo27/app-fin-backend.git

# Em outro terminal, na pasta do backend
npm start
# Servidor disponível em: http://localhost:3000

API Endpoints
O app consome os seguintes endpoints:

GET /categorias - Lista categorias de transações
GET /transacoes - Lista todas as transações
POST /transacoes - Cria nova transação
GET /resumo - Resumo financeiro do mês

Telas

1. Dashboard

Visão geral das finanças com:

Saldo atual
Total de receitas e despesas
Cartões de crédito com limites
Botões de navegação rápida

2. Transações

Lista completa de transações com:

Filtros por tipo (todas/receitas/despesas)
Detalhes: descrição, valor, categoria, data
Botão flutuante para nova transação

3. Nova Transação

Formulário completo com:

Tipo (receita/despesa)

Descrição e valor
Categoria selecionável
Forma de pagamento
Data e parcelamento opcional
Validação em tempo real

Configuração do Ambiente

Variáveis de Ambiente
Crie um arquivo .env na raiz (opcional):
API_URL=http://localhost:3000

Para Desenvolvimento

# Modo desenvolvimento com hot reload
npx expo start --clear

# Build para produção
eas build --platform android
eas build --platform ios

Licença
Este projeto foi desenvolvido para fins educacionais como parte do curso SENAC.

👨‍💻 Autor
Heitor Leonardo - GitHub

Contexto Acadêmico
Projeto desenvolvido como parte do Desafio III - Individual do curso, demonstrando habilidades em:

Desenvolvimento mobile com React Native
Integração frontend/backend
Implementação de operações CRUD
Gerenciamento de estado e navegação
Consumo de APIs REST
