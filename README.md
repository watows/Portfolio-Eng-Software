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
* Next.js: Framework para construção de interfaces web modernas e performáticas.
* CSS/SCSS: Para estilização das páginas e componentes.
* HTML: Linguagem de marcação para estruturar as páginas.

##Backend
* Python: Linguagem de programação para a criação do algoritmo de IA.
* Flask: Framework web para implementar as rotas e a lógica do backend.
* Pandas: Biblioteca para manipulação de dados e integração com arquivos Excel.
* Scikit-learn: Para o desenvolvimento do algoritmo de IA, utilizando técnicas como K-Nearest Neighbors (KNN) para sugerir combinações de receitas.
* SQLite: Banco de dados leve para armazenar receitas e cardápios.

##Teste e Qualidade
~Desenvolver aqui ainda!

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
O desenvolvimento do projeto será organizado em etapas com base na abordagem ágil. As principais tarefas serão organizadas em um backlog e priorizadas conforme as funcionalidades mais importantes para o cliente. Cada fase incluirá design, desenvolvimento e testes para garantir a qualidade do sistema.

## Pacotes de Entrega
### Pacote 1: Configuração Inicial
* Configuração do ambiente de desenvolvimento (backend e frontend).
* Integração com o banco de dados e leitura de dados do Excel.

### Pacote 2: Gerenciamento de Receitas
* Implementação do cadastro e gerenciamento de receitas no banco de dados.
* Interface para visualização e seleção de receitas.

### Pacote 3: Algoritmo de IA
* Desenvolvimento do algoritmo de IA para sugerir combinações de pratos.
* Implementação de relatórios para visualização dos cardápios.

### Pacote 4: Interface do Usuário
* Desenvolvimento da interface com Next.js para gerenciar receitas e visualizar cardápios.

## Infaestrutura
~Desenvolver aqui ainda!

# Acesso da Aplicação em Produção
~Desenvolver aqui ainda!

# Para Contribuir com o Projeto
Se você deseja contribuir para o projeto Sistema especialista para geração de cardápios personalizados, seja para implementar novas funcionalidades, corrigir bugs ou para estudos acadêmicos, siga os passos abaixo. Não esqueça de abrir um Pull Request para que possamos revisar e discutir suas mudanças.

## Configuração Inicial
~Desenvolver aqui ainda!

## Executando o Projeto
~Desenvolver aqui ainda!

## Testes
~Desenvolver aqui ainda!

## Banco de Dados
~Desenvolver aqui ainda!

## Pull Requests
1. Crie uma nova branch a partir da `master` para suas alterações.
2. Faça commit das suas mudanças com mensagens claras e descritivas.
3. Suba a branch para o repositório e abra um Pull Request detalhando as mudanças realizadas.
