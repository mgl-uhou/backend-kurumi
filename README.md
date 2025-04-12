# Flaggame - Backend

## Descrição
  APIRESTful estruturada para jogo de bandeiras onde é possível, publicamente, fazer cadastro, login e gerenciamento da conta do usuário e todo o CRUD da tabela de bandeiras, tendo rotas privadas para edição das tabelas.

### Tabelas do Banco

Users: 
* id (int, primary key)
* nickname (varchar, not null, unique)
* email (varchar, not null, unique)
* password (varchar)
* createdAt (date, not null)

Flags: 
* id (int, primary key)
* name (varchar, not null, unique)
* link (varchar, not null, unique)

## Teste
  Acesse o a API publicada no onRender e que faz uso de um banco do Supabase clicando [aqui](https://backend-flaggame.onrender.com/api-docs).

> Miguel Laurentino
