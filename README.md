# Kurumi - Backend

## Descrição

APIRESTful estruturada para gerenciamento de usuários e seus endereços.

### Tabela do Banco

Users:

- id (int, primary key)
- nickname (varchar(30), not null)
- email (varchar, not null, unique)
- password (varchar, not null)
- cep (varchar(9), not null)
- street (varchar, not null)
- neighborhood (varchar, not null)
- city (varchar, not null)
- state (varchar(2), not null)
- createdAt (date, not null)

## Teste

Para testes ou utilizações, baixe o arquivo zipado ou faça o clone do repositório.

**Requisitos:** NodeJS versão 22 ou posterior

Acesse o terminal na pasta raiz do projeto e execute os comandos:

```bash
# Instale o gerenciador de pacotes Yarn, caso não o tenha, ou atualize-o com o seguinte comando:
npm install -g yarn

# Verifique a instalação do Yarn com:
yarn --version

# Instale as dependências do projeto executando o comando:
yarn 

# Rode as migrations com: 
npx sequelize-cli db:migrate

# Inicie o servidor com:
yarn start
```

Pronto, agora é só testar a API via swagger acessando o link que aparecer no console.

> Miguel Laurentino
