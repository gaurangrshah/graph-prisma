import getUserId from '../utils/getUserId';

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true
      }
    }

    if (args.query) {
      opArgs.where = {
        OR: [{
          title_contains: args.query
        }, {
          body_contains: args.query
        }]
      }
    }
    return prisma.query.posts(opArgs, info)
  },
  myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const opArgs = {
      where: {
        author: {
          id: userId
        }
      }
    }
    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }]
    }
    return prisma.query.posts(opArgs, info)
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false)
    // 2nd argument "false" sets authRequired to = false. Making this a public query.
    const posts = await prisma.query.posts({
      where: {
        id: args.id, // find matching post, then check if that post matches following criteria:

        OR: [{ // use any of the following criteria:
          published: true // matches if post is published & availble to the public.
        }, {
          author: {
            id: userId // matches if this user is the author of this post
          }
        }]
        // check if the post is published or if this user is the author of this post
      }
    }, info)

    // handle response:
    if (posts.length === 0) throw new Error('post not found');

    return posts[0]
    // return the first matching post, (will be the only post in the array if there is an actual match)

  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    console.log(userId);
    return prisma.query.user({
      // check if any user matches the id passed in via args
      where: {
        id: userId
      }
    })
  },
}

export { Query as default };
