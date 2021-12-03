"use strict";

// Estamos requiriendo las librerias que se va a usar desde la dependencia de GraphQl
const { graphql, buildSchema } = require("graphql");
// requerir las librerias que necesitamos para ejecutar express
const express = require("express");
const gqlMiddleware = require("express-graphql");

// Luego de requerir express debemos crear una API de express
const app = express();
// se configura el puerto de escucha de api
const port = process.env.port || 3000;

// Definiendo el esquema
const schema = buildSchema(`
  type Query {
    "Retorna un saludo al mundo"
    hello: String
  }
`);

// Configurar los resolver
const resolvers = {
  hello: () => {
    return "Hola Mundo";
  },
  //saludo: () => {
  //return "Hola a todos!";
  //},
};

// Ejecutndo el query hello
//graphql(schema, "{ hello }", resolver).then((data) => {
//  console.log(data);
//});

// Configuramos el midleware para la ejecucion de los resolvers
app.use(
  "/api",
  gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

// Por ultimo es cionfigurar lo de la escucha
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}/api`);
});
