Para iniciar o container Docker, certifique-se de ter o Docker instalado e execute o comando:

`docker-compose up`.

A seguir abra o terminal  e rode:
`npm install`


A seguir abra o terminal e rode:
`npx prisma migrate dev:`


Para inciar o servidor no terminal:

`npm run dev`


para test unitarios:

`npm run test`



para test e2e:

`npm run test:e2e`




Desenvolvi uma aplicação pessoal para facilitar o registro de check-ins em academias. A ideia era criar uma plataforma simples e intuitiva, que me permitisse acompanhar minha frequência nos treinos e descobrir academias próximas onde posso praticar exercícios.

Funcionalidades Principais:

    Cadastro e Autenticação de Usuário: A aplicação permite o cadastro e autenticação de usuários de forma rápida e segura.

    Perfil do Usuário e Histórico de Check-ins: Os usuários têm acesso ao seu perfil personalizado, onde podem visualizar informações relevantes sobre sua atividade física, incluindo o histórico de check-ins em academias cadastradas na plataforma.

    Busca e Check-in em Academias: A aplicação oferece recursos avançados de busca, permitindo encontrar academias próximas com base na localização ou pesquisar por nome específico. Os usuários podem realizar check-in de forma fácil e conveniente sempre que frequentarem uma academia.

    Validação de Check-ins: Os check-ins realizados são sujeitos a validação, garantindo a integridade e a segurança das informações registradas.

Regras de Negócio e Requisitos Não-Funcionais:

    Segurança e Integridade dos Dados: Todos os dados são armazenados de forma segura, com senhas criptografadas e utilizando um banco de dados PostgreSQL para persistência das informações.

    Controle de Acesso e Permissões: Implementei regras de negócio para garantir a integridade das operações, como a restrição de cadastro de e-mails duplicados e a validação de check-ins apenas pelo administrador da plataforma.

    Escalabilidade e Desempenho: A aplicação foi desenvolvida com foco na escalabilidade e no desempenho, utilizando técnicas de paginação para otimizar o carregamento de dados e garantir uma experiência fluida mesmo em períodos de alta demanda.

Tecnologias Utilizadas:

Para o desenvolvimento do projeto, utilizei tecnologias modernas e robustas, incluindo Fastify para a construção da API, Prisma para o acesso ao banco de dados, e Docker para facilitar o gerenciamento do ambiente de desenvolvimento. Além disso, utilizei TypeScript para garantir a segurança e a manutenibilidade do código, e JSON Web Tokens (JWT) para autenticação dos usuários




