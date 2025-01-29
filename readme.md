Sistema de Gerenciamento de Eventos - Backend
Este é o backend da aplicação de gerenciamento de eventos, desenvolvido com Node.js e Express. Ele gerencia a criação de eventos, confirmações de presença e autenticação de usuários.

Tecnologias Utilizadas
Node.js: Ambiente de execução para JavaScript no backend.
Express: Framework para construção de APIs RESTful.
MongoDB (ou outro banco de dados como PostgreSQL): Para armazenar dados de eventos e usuários.
JWT: Para autenticação de usuários.
Mongoose: Para trabalhar com MongoDB de forma mais simples.
Pré-requisitos
Certifique-se de ter o Node.js instalado na sua máquina, além do MongoDB configurado localmente ou em um serviço de nuvem (como MongoDB Atlas).

Instalação
Clone este repositório para sua máquina local:

bash
Copiar
Editar
git clone https://github.com/seuusuario/projeto-eventos-backend.git
cd projeto-eventos-backend
Instale as dependências:

Com o npm:

bash
Copiar
Editar
npm install
Ou, com o yarn:

bash
Copiar
Editar
yarn install
Configuração do Banco de Dados
Caso esteja usando o MongoDB localmente, certifique-se de ter o MongoDB instalado e rodando na sua máquina.
Caso esteja usando o MongoDB Atlas, crie um cluster e substitua a string de conexão no arquivo de configuração de banco de dados.
Rodando o Projeto
Inicie o backend:

Com o npm:

bash
Copiar
Editar
npm start
Ou, com o yarn:

bash
Copiar
Editar
yarn start
O servidor estará rodando na URL http://localhost:8000.

Estrutura do Projeto
src/controllers: Controladores que lidam com a lógica de negócio, como criação e listagem de eventos.
src/routes: Definição das rotas da API, como GET /events, POST /events, etc.
src/models: Modelos de dados, como o modelo de evento e usuário.
src/database: Configuração do banco de dados e conexão.
src/middleware: Middleware para autenticação com JWT e validações.
Funcionalidades
Gerenciamento de Eventos: CRUD de eventos (criar, listar, editar, excluir).
Confirmação de Presença: Registro da presença dos usuários nos eventos.
Autenticação de Usuários: Login e registro de usuários com JWT para proteção de rotas.
API para Frontend: Fornecimento de dados do backend para o frontend, como a lista de eventos.
