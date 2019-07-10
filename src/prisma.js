import { Prisma } from 'prisma-binding';
// "Prisma" - is a constructor function used to create a connection to a prisma endpoint
import { fragmentReplacements } from '../src/resolvers/index'
// fragmentReplacements contains all extracted fragments from resolvers.

// call prisma constructor and store its return value:
export const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.100:4466',
  secret: 'thisismysupersecrettext',
  fragmentReplacements, // exposes all extracted fragments from resolvers.
});

// export { prisma as default }


// prisma.exists.Comment({
//   id: "cjxjavu9m00440761x34d7tk7"
// }).then((exists) => {
//   console.log(exists);
// })

// prisma.mutation.createPost({
//   // 1st argument = operation arguments (args)
// data: {
//   title: "new post title",
//   body: "you can find a new course here",
//   published: true,
//   author: {
//     connect: {
//       id: "cjxj80fao000w0761v5foydjk"
//     }
//   }
// }
//   // 2nd argument = selection set -- data we expect returned
// }, '{id title published author {id name}}')
//   // how we handle the data that gets returned
//   .then((data) => {
//     console.log(JSON.stringify(data, null, 2)); //⚠️
//     return prisma.query.users(null, '{id name posts {id title}}').then((data) => {
//       console.log(JSON.stringify(data, null, 2)); //⚠️
//     })
//   })


// prisma.mutation.updatePost({
//   where: {
//     id: "cjxjts0cw008o07617m119drm"
//   },
//   data: {
//     body: "updated body text",
//     published: true
//   }
// }, '{id title published}').then((data) => {
//   console.log(JSON.stringify(data, null, 2)); //⚠️
//   return prisma.query.users(null, '{id name posts {id title}}').then((data) => {
//     console.log(JSON.stringify(data, null, 2)); //⚠️
//   }).catch((err) => console.log(err));
// })

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId })

//   if (!userExists) {
//     throw new Error('User not found')
//   }
//   // async request takes two arguments, the id to match and the data to update
//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{ author { id name email posts { id title published } } }')

//   return post.author
// }

// createPostForUser('cjxj80fao000w0761v5foydjk', {
//   title: "Great Books to read",
//   body: 'The War of Art',
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//   console.log(error.message)
// })


// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });

//   if (!postExists) throw new Error('Post not found')

//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data
//   }, '{author { id name email posts { id title published } } }')
//   return post.author
// }

// updatePostForUser('cjxjux83k009r07617y4r3flr', {
//   title: "updated title"
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//   console.log(error.message);
// })
