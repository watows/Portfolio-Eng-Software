# Sistema especialista para geração de cardápios personalizados
Portfólio de conclusão de curso de Engenharia de Software.

# Objetivo do Projeto
Desenvolver um sistema inteligente para a programação de cardápios mensais personalizados em restaurantes e cozinhas industriais. Utilizando inteligência artificial, o sistema será capaz de analisar dados de receitas, considerando fatores como custo, calorias, restrições alimentares, sazonalidade e incidência desejada, sugerindo combinações que atendam aos requisitos/regras pré-definidos sendo eles relacionados a:

* Restrições alimentares (glúten e lactose)
* Equilíbrio nutricional (recomendações PAT - Calorias e NDpCal)
* Custo
* Incidência
* Sazonalidade
* Modo de preparo

# Escopo:
1. Cadastro de Receitas;
   * Adição e gerenciamento de receitas no banco de dados com informações detalhadas.
2. Seleção de Cardápio;
   * Ferramenta para selecionar receitas e gerar cardápios mensais com base nos requisitos do usuário.
3. Análise de Dados;
   * Análise das receitas levando em consideração custos, calorias, restrições alimentares (glúten, lactose, etc.), sazonalidade e modo de preparo.
4. Geração de Relatórios;
   * Criação de relatórios com as informações do cardápio para controle e visualização.
5. Personalização;
   * O sistema permitirá a edição e ajuste do cardápio mensal conforme necessidade.

# Tecnologias Utilizadas
## Frontend
* React: Biblioteca para construção de interfaces.
* Next.js: Framework para renderização e rotas do frontend.
* HTML e CSS: Linguagens para estruturar e estilizar as páginas.

## Backend
* Python: Para a lógica do sistema e manipulação de dados.
* Flask: Framework web para implementação de rotas e lógica do backend.
* PostgreSQL: Banco de dados relacional para armazenamento de receitas e cardápios.

## Teste e Qualidade
* React Testing Library: Biblioteca mais recomendada para testes de componentes React.
* Jest: Framework de Testes em JavaScript com um foco na simplicidade.

# Requisitos do Projeto
## Requisitos Funcionais:
* RF1: O sistema deve permitir a realização de login.
* RF2: O sistema deve permitir o cadastro e gerenciamento de receitas no banco de dados.
* RF3: O sistema deve sugerir combinações de pratos que atendam aos requisitos do cardápio mensal.
* RF4: O sistema deve permitir alterar de forma manual alguma receita do cardápio sugerido.
* RF5: O sistema deve permitir a geração de relatórios com informações sobre o cardápio mensal.
## Requisitos Não Funcionais:
* RNF1: O sistema deve ser desenvolvido em Python.
* RNF2: O sistema deve ser implementado utilizando uma arquitetura web.
* RNF3: O sistema deve ser capaz de lidar com um grande volume de dados.
* RNF4: O sistema deve garantir a segurança e privacidade dos dados dos clientes.
* RNF5: O sistema deve ser intuitivo para os usuários.

# Metodologia de Organização de Tarefas
O desenvolvimento do projeto foi organizado em etapas com base na abordagem FDD (Feature-Driven Development). As principais funcionalidades foram definidas e priorizadas no início do projeto, e cada funcionalidade foi desenvolvida de forma independente. Cada fase do desenvolvimento incluia o design e a implementação.

## Pacotes de Entrega
### Pacote 1: Configuração Inicial
* Configuração do ambiente de desenvolvimento (backend e frontend).
* Integração com o banco de dados e leitura de dados do Excel.

### Pacote 2: Gerenciamento de Receitas
* Implementação do cadastro e gerenciamento de receitas no banco de dados.
* Interface para visualização e seleção de receitas.

### Pacote 3: Interface do Usuário
* Desenvolvimento da interface com Next.js para gerenciar receitas e visualizar cardápios.

### Pacote 4: Geração de Cardápios
* Desenvolvimento do algoritmo para sugerir combinações de pratos.
* Implementação de relatórios para visualização dos cardápios.

# Para Contribuir com o Projeto
Se você deseja contribuir para o projeto Sistema especialista para geração de cardápios personalizados, seja para implementar novas funcionalidades, corrigir bugs ou para estudos acadêmicos, siga os passos abaixo. Não esqueça de abrir um Pull Request para que possamos revisar e discutir suas mudanças.

## Configuração Inicial
1. Faça o clone do repositório:
   * git clone https://github.com/watows/Portfolio-Eng-Software
     
2. Instale as dependências do projeto utilizando npm:
   * npm install

## Executando o Projeto
1. Para iniciar o servidor do back-end:
   * npm run start-backend
     
2. Para iniciar o cliente React:
   * npm run start-frontend

## Testes
Para executar os testes do back-end e do front-end:
  * npm test

Para verificar a cobertura dos testes
  *npm run test:coverage

## Banco de Dados
Este projeto utiliza o PostgreSQL como banco de dados. Para configurar o banco de dados:

1. Instale o PostgreSQL localmente ou crie uma instância em um serviço de hospedagem de bancos de dados.
2. Configure a string de conexão no arquivo config.py ou nas variáveis de ambiente, conforme necessário.

Exemplo de string de conexão no arquivo config.py:
DATABASE_URI = os.getenv('DATABASE_URI', 'postgresql://postgres:watows@localhost/receitas')

## Pull Requests
1. Crie uma nova branch a partir da `master` para suas alterações.
2. Faça commit das suas mudanças com mensagens claras e descritivas.
3. Suba a branch para o repositório e abra um Pull Request detalhando as mudanças realizadas.
