# Microservices using ExpressJs and RabbitMQ

---

## Getting Started

1. Install dependencies

```bash
npm i
```

2. Run docker to start rabbit mq

```bash
docker compose up
```

3. After select below command and add in different terminal to start microservices and to interact with each other using rabbit mq

- User service

```bash
cd src && cd user-service && npm i && npm start
```

- Product service

```bash
cd src && cd product-service && npm i && npm start
```

- Main service

```bash
cd src && cd main && npm i && npm start
```

---

## Postman

### Select schema from `./postman/microservices.postman_collection.json` and add it in postman

### OR

### Users

- Add below as postman url

```url
http://localhost:4000/register
```

- Add below as data, for that select `Body` in postman tabs and select `raw` and from dropdown select `json`

- After that use below data as json object to send data

```json
{
  "name": "User",
  "email": "user@gmail.com"
}
```

- Hit the send button and your request is sent to rabbit mq

### Products

- Add below as postman url

```url
http://localhost:5000/prodcuts
```

- Add below as data, for that select `Body` in postman tabs and select `raw` and from dropdown select `json`

- After that use below data as json object to send data

```json
{
  "product": "Product 1",
  "price": "$200"
}
```

- Hit the send button and your request is sent to rabbit mq

### Main

- To see the results that are send through above services, go to `Main-Service` terminal, their you can see all the request that were send using through user and product url in postman
