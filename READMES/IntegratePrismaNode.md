# Integrating Prisma with Node.js

---------------------------------

Our goal is to connect our postgres database to our Node.js application, effectively allowing Node.js to be able to read/write data to and from the database just as we can with our prisma graphql api. 

In order to achieve this prisma exposes what are called `bindings` which allow us to "bind" queries, mutations, subscriptions, etc to node based javascript functions, allowing our application to use these bindings to interact with and maintain the data in our database. 

> **Prisma Bindings**: https://github.com/prisma/prisma-binding



> ### Example
>
> Consider the following data model for your Prisma service:
>
> ```js
> type User {
>   id: ID! @unique
>   name: String
> }
> ```
>
> If you instantiate `Prisma` based on this service, you'll be able to send the following queries/mutations:
>
> ```js
> // Instantiate `Prisma` based on concrete service
> const prisma = new Prisma({
>   typeDefs: 'schemas/database.graphql',
>   endpoint: 'https://us1.prisma.sh/demo/my-service/dev',
>   secret: 'my-super-secret-secret'
> })
> 
> // Retrieve `name` of a specific user
> prisma.query.user({ where: { id: 'abc' } }, '{ name }')
> 
> // Retrieve `id` and `name` of all users
> prisma.query.users(null, '{ id name }')
> 
> // Create new user called `Sarah` and retrieve the `id`
> prisma.mutation.createUser({ data: { name: 'Sarah' } }, '{ id }')
> 
> // Update name of a specific user and retrieve the `id`
> prisma.mutation.updateUser({ where: { id: 'abc' }, data: { name: 'Sarah' } }, '{ id }')
> 
> // Delete a specific user and retrieve the `id`
> prisma.mutation.deleteUser({ where: { id: 'abc' } }, '{ id }')
> ```
>
> Under the hood, each of these function calls is simply translated into an actual HTTP request against your Prisma service (using [`graphql-request`](https://github.com/prisma/graphql-request)).
>
> The API also allows to ask whether a specific node exists in your Prisma database:
>
> ```js
> // Ask whether a post exists with `id` equal to `abc` and whose
> // `author` is called `Sarah` (return boolean value)
> prisma.exists.Post({
>   id: 'abc',
>   author: {
>     name: 'Sarah'
>   }
> })
> ```
>
> **API**: https://github.com/prisma/prisma-binding#api
>
> **query** and **mutation**: https://github.com/prisma/prisma-binding#query-and-mutation



