# 🚖 RideSphere - Aplicação de Solicitação de Viagens

Bem-vindo ao **RideSphere**, o sistema sugere um serviço de transporte que vai além do convencional, conectando usuários de maneira inovadora e abrangente, com uma proposta tecnológica e moderna. É um nome pensado para se destacar e transmitir confiança. O projeto permite a estimativa de custos de viagens, escolha de motoristas e visualização de rotas, usando a Google Maps API e um banco de dados relacional para histórico.Este projeto permite estimar valores de viagens, escolher motoristas e acessar o histórico de viagens realizadas.

---

## ✨ Tecnologias Utilizadas

### **Frontend**
- **React**: Biblioteca para construção de interfaces.
- **TypeScript**: Tipagem estática para maior segurança e escalabilidade.
- **Tailwind CSS**: Framework CSS utilitário.

### **Backend**
- **Node.js**: Plataforma JavaScript para execução no servidor.
- **Express**: Framework minimalista para APIs REST.
- **TypeScript**: Tipagem estática para maior segurança.
- **PostgreSQL**: Banco de dados relacional.

### **APIs**
- **Google Maps API**: Para cálculo de rotas e estimativa de viagens.

---

## 📂 Estrutura do Projeto

### **Backend**
- `src/server.ts`: Configuração do servidor Express.
- `src/routes/index.ts`: Definição das rotas da API.
- `src/controllers/rideController.ts`: Controladores para estimativa, confirmação e histórico.
- `src/config/database.ts`: Configuração do banco de dados PostgreSQL via Sequelize.
- `src/models/rideModel.ts`: Modelo de dados para as viagens.
- `.env`: Arquivo de configuração para variáveis de ambiente.

### **Frontend**
- `src/index.tsx`: Entrada principal do React.
- `src/App.tsx`: Componente principal e configuração de rotas.
- `src/components/TravelRequest.tsx`: Componente de solicitação de viagens.
- `src/components/TravelOptions.tsx`: Componente para exibição das opções de motoristas.
- `src/components/TravelHistory.tsx`: Componente para o histórico de viagens.
- `tailwind.config.js`: Configuração do Tailwind CSS.

---

## 🎨 Funcionalidades Implementadas

### **Backend**
- **Solicitação de Viagem**: Estimativa de valores com base na origem e destino.
- **Confirmação de Viagem**: Escolha do motorista e registro no histórico.
- **Histórico de Viagens**: Listagem das viagens realizadas por um usuário.

### **Frontend**
- **Tela de Solicitação de Viagem**: Formulário para estimar viagens.
- **Tela de Opções de Viagem**: Exibição dos motoristas disponíveis.
- **Tela de Histórico de Viagens**: Histórico detalhado de viagens realizadas.
- **Estilização Responsiva**: Uso do Tailwind CSS para um design atraente e funcional.
- **Testes Unitários**: Garantia de qualidade com Jest e React Testing Library.

---

## 🛠️ Comandos para Executar o Projeto Localmente (Sem Docker)

### **Pré-requisitos**
- **Node.js** e **npm** instalados.
- **Docker** e **Docker Compose** instalados.
- **Chave da API do Google Maps**.

### **Passos**

1. **Backend**:
   ```bash
   cd backend
   npm install
2. **Configurar variáveis de ambiente: No diretório backend, crie um arquivo .env com as seguintes variáveis**: 
   ```bash
   GOOGLE_API_KEY=your_google_api_key_here
   DATABASE_URL=postgres://myuser:mypassword@localhost:5432/nextrip
   PORT=8080

3. **Executar o servidor do backend**:
   ```bash
   npm start

4. **Executar testes do backend**:
   ```bash
   npm test
5. **Frontend**
   ```bash
   cd frontend
   npm install

6. **Iniciar o servidor do frontend**:
   ```bash
   npm start
7. **Executar testes do frontend**:
   ```bash
   npm test

8. **Acessar a aplicação**:

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## 🚀 Requisitos Cumpridos
- Backend com Node.js e Express. 
- Banco de dados PostgreSQL configurado via Sequelize.
- APIs RESTful para:
  - Estimativa de Viagens.
  - Confirmação de Viagens.
  - Histórico de Viagens.
- Frontend responsivo com React e Tailwind CSS.
- Testes unitários para backend e frontend.
- Integração com Google Maps API.
- Docker para ambientes de desenvolvimento.

## 🧪 Testes e Qualidade
**Backend**:

Testes unitários com Jest.
Cobertura de código de controladores e serviços.

**Frontend**:

Testes de componentes com React Testing Library.
Validação de interfaces e interatividade.

## 🌟 Postman (Para Requisições)
## 🎲 PostgreSQL (Para Banco de Dados Relacional)

## 🐳 Docker: Configuração e Execução

O **NexTrip** foi totalmente containerizado com **Docker** para facilitar a configuração e execução do projeto.

### 📂 Arquivos Relacionados
- **`Dockerfile`**: Configuração do ambiente para frontend e backend.
- **`docker-compose.yml`**: Configuração para gerenciar os containers e serviços do projeto.

1. **Subir os containers do projeto (frontend, backend, banco de dados)**:
   ```bash
   docker-compose up --build
2. **Parar os containers em execução**:
   ```bash
   docker-compose down

3. **Verificar logs dos containers**:
   ```bash
   docker-compose logs -f


