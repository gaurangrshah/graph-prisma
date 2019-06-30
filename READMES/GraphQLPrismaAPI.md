# GraphQL Prisma API

---------------------------------

Let's start by running the playground: `http://localhost:4466`

Running the `createUser` Query:

> ```js
> # Write your query or mutation here
> mutation createuser {
>   createUser(data:{
>     name: "G Shah"
>   }
>   ) {
>     id name
>   }
> }
> ```
>
> ```json
> {
>   "data": {
>     "createUser": {
>       "id": "cjxiggbkw00xm0813j4b6v2em",
>       "name": "G Shah"
>     }
>   }
> }
> ```



We can see that we've successfully created a new user, we can actually view this data with PGAdmin in our database:

![image-20190630012820445](http://ww1.sinaimg.cn/large/006tNc79ly1g4j4azbp02j30ju08zdgp.jpg)

We can also run a fetch query to get all users from the playground:

> ![image-20190630013024846](http://ww2.sinaimg.cn/large/006tNc79ly1g4j4cxc8c3j30x7086my3.jpg)
>
> ```js
> query {
>   users {
>     id
>     name
>   }
> }
> ```
>
> ```json
> {
>   "data": {
>     "users": [
>       {
>         "id": "cjxiggbkw00xm0813j4b6v2em",
>         "name": "G Shah"
>       },
>       {
>         "id": "cjxiij0k9010h08134mm1mhdz",
>         "name": "Julius"
>       }
>     ]
>   }
> }
> ```



Now we can also take a look at updating a user:

```js
mutation {
  updateUser(
    where: { id: "cjxiij0k9010h08134mm1mhdz" }
    data: { name: "NewName" }
  ) {
    id
    name
  }
}
```

```json
{
  "data": {
    "updateUser": {
      "id": "cjxiij0k9010h08134mm1mhdz",
      "name": "NewName"
    }
  }
}
```





Delete user:

```js
mutation deleteUser {
  deleteUser(
    where: {id: "cjxiij0k9010h08134mm1mhdz"}
  ) {
    id
    name
  }
}
```

```json
{
  "data": {
    "deleteUser": {
      "id": "cjxiij0k9010h08134mm1mhdz",
      "name": "NewName"
    }
  }
}
```

