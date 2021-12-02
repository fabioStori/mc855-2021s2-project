# Universidade Estadual de Campinas
# Instituto da Computação

## Disciplina: MC855-2s2021

#### Professor e Assistente

| Nome                     | Email                   |
| ------------------------ | ------------------------|
| Professora Juliana Borin | jufborin@unicamp.br     |
| Assistente Paulo Kussler | paulo.kussler@gmail.com |


#### Equipe

| Nome                         | RA               | Email                  | ID Git                |
| ---------------------------- | ---------------- | ---------------------- |---------------------- |
| Adivair Santana Ramos        | 193325           | a193325@dac.unicamp.br | A193325               |
| Fabio Stori                  | 196631           | f196631@dac.unicamp.br | fabioStori            |
| Felipe Duarte Domingues      | 171036           | f171036@dac.unicamp.br | exofelipe             |
| Gabriel Francioli Alves      | 172111           | g172111@dac.unicamp.br | gfrancioli            |



# Rastreamento de Equipamentos com RFID 

Está parte do projeto é composta por uma Single-page application(SPA) que consumirá os dados gerados pelas leituras das TAGS presentes nos itens monitorados pelos dos sensores (RFID, Bluetooth, etc.).

Tem como objetivo/responsabilidade lidar com toda as interações entre o sistema e os usuários.

## Funcionalidades
### Google Login
 O login foi implementado utilizando a [API de login do Google](https://developers.google.com/identity/sign-in/web/sign-in), porém, somente usuários previamente cadastrados conseguem ter acesso ao sistema.

![image](https://user-images.githubusercontent.com/33457554/144328439-0728ead2-9db0-498a-b77b-a47dcef09e93.png)

### Cadastro e Gerenciamento de Usuários

Além de cadastrar, é possível definir os níveis de acesso do usuário, os níveis disponíveis são: Consulta, Manutenção e Administração.

![image](https://user-images.githubusercontent.com/33457554/144328544-387abb4d-3a6b-469e-b903-d36078363bd3.png)

### Cadastro e Gerenciamento de Itens

Gerenciamento dos itens que terão a movimentação monitorada.

![image](https://user-images.githubusercontent.com/33457554/144328616-abbc8784-7ae3-4ce5-867e-d658d6d06cda.png)

### Cadastro e Gerenciamento de Sensores

Gerenciamento dos sensores que serão posicionados em locais estratégicos para fazer a leitura das TAGS presentes nos itens.

![image](https://user-images.githubusercontent.com/33457554/144328661-14b58105-3755-41df-a8e5-d0c19df084c3.png)

### Históricos de Movimentações

Visualização das movimentações dos itens. Contém filtros por intervalo de data, sensores e itens. Também é possível de exportar os dados filtrados como CSV.

![image](https://user-images.githubusercontent.com/33457554/144328759-84fa3a0c-b6e8-4daa-84c6-4cce42510654.png)

## Tecnologias

Essa parte do projeto(SPA) foi implementada usando [React](https://pt-br.reactjs.org/) e [Material UI](https://mui.com/pt/).
Outras bibliotecas utilizadas podem ser encontradas no arquivo *package.json*.

## Instalação

É necessário [Node.js](https://nodejs.org/)  instalado para rodar a aplicação.

Após clonar o repositório, use o gerenciador de pacotes [yarn](https://yarnpkg.com/) para instalar todas as dependências do projeto.

```bash
yarn install
```

Se não possui o [yarn](https://yarnpkg.com/) instalado, instale-o com o seguinte comando:

```bash
npm install --global yarn
```

## Iniciando o servidor em ambiente local

Após a instalar todas as dependências com o comando acima, rode o seguinte  para iniciar o servidor local.

```bash
yarn start
```

## Acessando a aplicação local

Se não ocorrer problemas, você receberá essa mensagem no prompt de comando.

```bash
Compiled successfully!

You can now view mc855-project in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://{your_ip_address}:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

Então é só acessar [http://localhost:3000](http://localhost:3000) no seu navegador.

## Acessando a aplicação em produção

A aplicação está hospedada no servidor [cloud da Unicamp](https://cloud.ic.unicamp.br/), com o seguinte endereço: https://invent-io.ic.unicamp.br/.


## Repositório da Professora Juliana no Gitlab do IC

[Repositorio](http://repositorio)

## Zip com o projeto e todos artefatos para futuras evoluções dos projetos por outros alunos das turmas seguintes

[Arquivo Zip](http://zip)

