# cashbackend
Sistema para seus revendedores(as) cadastrarem suas compras e acompanhar o retorno de cashback de cada um.

## Rodar local

Instale as dependências do projeto:

```sh
yarn install
```

Após isso rode uma instancia do mongo:

`docker run --name nodemongo -p 27017:27017 -d -t mongo`

Depois só rodar o projeto:

```sh
yarn dev
```

OBS: É necessário ter o .env configurado com o AUTH_SECRET e o DATABASE_URI


## Docker

Caso não possua o docker instalado na sua maquina, faça a instalação do mesmo em -> [docker](https://www.docker.com/get-started)

Após instalado o docker e o docker-compose, execute os seguintes comandos:

1. docker-compose build
2. docker-compose up

OBS: Não esqueça de configurar o .env

## Testes

Para realizar os testes:
- yarn test

## APIs

### Create Seller

```bash
curl -X POST \
  http://localhost:3000/sellers/ \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "Maria",
	"password": "simplepassword",
	"cpf": "15350946056",
	"email": "teste@admin.com"
}'
```

### Create Session

```bash
curl -X POST \
  http://localhost:3000/sessions/ \
  -H 'Content-Type: application/json' \
  -d '{
	"email": "teste@admin.com",
	"password": "simplepassword"
}'
```

### Create Purchase

- replace **SESSION_TOKEN_HERE**

```bash
curl -X POST \
  http://localhost:3000/purchase/ \
  -H 'Authorization: Bearer SESSION_TOKEN_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
	"productCode": "Bicycle",
	"price": 1000.99
}'
```

### List Purchases

- replace **SESSION_TOKEN_HERE**

```bash
curl -X GET \
  http://localhost:3000/purchase/ \
  -H 'Authorization: Bearer SESSION_TOKEN_HERE' \
  -H 'Content-Type: application/json' 
```

### List Cashback aggregate

- replace **SESSION_TOKEN_HERE**

```bash
curl -X GET \
  http://localhost:3000/cashback/ \
  -H 'Authorization: Bearer SESSION_TOKEN_HERE' \
  -H 'Content-Type: application/json' 
```
