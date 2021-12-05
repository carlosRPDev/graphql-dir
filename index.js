'use strict'

// Estamos requiriendo las librerias que se va a usar desde la dependencia de GraphQl
const { makeExecutableSchema } = require('graphql-tools')
// requerir las librerias que necesitamos para ejecutar express
const express = require('express')
const gqlMiddleware = require('express-graphql')
// librerias para leer desde otra ubicacion el archivo schema
const { readFileSync } = require('fs')
const { join } = require('path')
// importamos los resilvers
const resolvers = require('./lib/resolvers')

// Luego de requerir express debemos crear una API de express
const app = express()
// se configura el puerto de escucha de api
const port = process.env.port || 3000

// Definiendo el esquema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Configuramos el midleware para la ejecucion de los resolvers
app.use(
  '/api',
  gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
)

// Por ultimo es cionfigurar lo de la escucha
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}/api`)
})
