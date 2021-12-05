# doe.rápido
O doe.rápido é uma aplicação destinada a facilitar o processo de doações à ONGS, instituições de caridade e semelhantes.
Esse repositório contém o front-end da aplicação desenvolvida em [Next.js](https://nextjs.org/), framework front-end que utiliza o React, biblioteca destinada à construção de interfaces criada pelo Facebook.

## Tecnologias
- Next.js
- React
- Typescript
- Context API
- Styled Components

## Como rodar a aplicação?

Para rodar a aplicação é preciso ter instalado em sua máquina algum gerenciador de dependências como [npm](https://nodejs.org/en/) ou [yarn](https://yarnpkg.com), nós sugerimos o último.
Com o gerenciador de dependências funcionando, no terminal, é preciso baixar e instalar as dependências da aplicação:

```bash
npm install
# or
yarn install
```

Uma vez instaladas, basta rodar a aplicação:

```bash
npm run dev
# or
yarn dev
```

Uma guia será aberta [http://localhost:3000](http://localhost:3000) no seu navegador, e você poderá ver a aplicação funcionando.
Por padrão, a aplicação está configurada para se comunicar com o back-end já rodando na nuvem através da azure, caso deseje rodar o back-end localmente, será necessário mudar a rota trocando as duas váriaveis `baseUrl` na criação do client de requisições dentro do arquivo `src/services/api.ts`

## Deploy

A aplicação está hospedada e rodando gratuitamente na plataforma da [Vercel](https://vercel.com/), o link atualizado é o https://doerapido.vercel.app/
