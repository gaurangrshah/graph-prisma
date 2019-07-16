import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'; // handles token verification
import generateToken from '../utils/generateToken'; // takes in "id" and returns an AuthToken
import hashPassword from '../utils/hashPassword';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {

    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer')
    }

    const password = await hashPassword(args.data.password)
    // hash will take in password and generate a hash with a length of 10 added onto the hashed password.

    const user = await prisma.mutation.createUser({  // creates and returns new user
      data: {
        ...args.data, // spread out data that gets passed in
        password, // override the password, that user passed in, with the hashed version.
      }
    });

    return {
      user,
      token: generateToken(user.id)
      // takes in an id returns an authorized Token
    }

  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request); // verifies auth token returns userId


    alert('deleting you.')
    // deletes the matching user, and passes in info as 2nd
    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
    // passes in userId from getUserId()
  },

  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    // verify if the user is authenticated, return userId for authenticated users.
    if (typeof args.data.password === 'string') {
      // check if password is being updated
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser({
      where: { // matches id
        id: userId // authenticated user's ID
      },
      data: args.data // updates data, bec node/prisma expect the same data properties.
    }, info) // passes in info as 2nd arg

  },

  async login(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user({ where: { email: data.email } });
    // only need the scalar fields back, so no need to provide info as 2nd arg

    if (!user) throw new Error('unable to login: 1');
    console.log(user.email);

    const isMatch = await bcrypt.compare(data.password, user.password);
    // compares hashed password to password passed in

    if (!isMatch) throw new Error('unable to login: 2');
    console.log(isMatch)

    return {
      user,
      token: generateToken(user.id)
      // sign and return token using the user's id, with expiry set to 7 days
    }
  },

  async createPost(parent, args, { prisma, request }, info) {
    // destructure request from context
    const userId = getUserId(request); // verifies auth token returns userId

    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: userId // uses verified userId from token to connect to author
          }
        }
      }
    }, info)
  },

  async updatePost(parent, { id, data }, { prisma, request }, info) {
    // desctructures request from ctx.

    const userId = getUserId(request);
    // verify if the user is authenticated, return userId for authenticated users.

    const postExists = await prisma.exists.Post({
      id, // if id matches
      author: {
        id: userId // if author id matches
      }
    })

    if (!postExists) throw new Error('no matching post found')

    const isPublished = await prisma.exists.Post({ id, published: true })
    // if post id matches a published post

    if (isPublished && data.published === false) {
      await prisma.mutation.deleteManyComments({ where: { post: { id } } })
      // deleteManyComments is a prisma generated mutations that deletes all comments for a given post id.
    }

    return prisma.mutation.updatePost({
      where: { id }, // authenticated user's ID
      data
    }, info)
  },

  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);// verifies auth token returns userId

    const postExists = await prisma.exists.Post({
      // find the match post based on the following criteria:
      id: args.id,
      author: {
        id: userId
      }
    })

    if (!postExists) throw new Error('unable to delete post');


    return await prisma.mutation.deletePost({ where: { id: args.id } }, info)
    // passes in verified userId to deletePost
  },

  async createComment(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: data.post, // grabs id for post from the data argument
      published: true // post must be published
    })

    if (!postExists) throw new Error('cannot comment on this post');

    return prisma.mutation.createComment({
      data: {
        text: data.text,
        author: {
          connect: {
            id: userId
          }
        },
        post: {
          connect: {
            id: data.post
          }
        }
      }
    }, info)
  },

  async deleteComment(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id, author: { id: userId }
    })

    if (!commentExists) throw new Error('cannot delete this comment')

    return prisma.mutation.deleteComment({ where: { id } }, info);
  },

  async updateComment(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id, author: { id: userId }
    })

    if (!commentExists) throw new Error('cannot udpate this comment')

    return prisma.mutation.updateComment({
      where: {
        id
      },
      data
    }, info)
  },
}

export { Mutation as default }
