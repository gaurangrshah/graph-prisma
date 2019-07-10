import getUserId from '../utils/getUserid';

const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);
      // authentication is not required.
      // if(!userId) { userId = null }

      if (userId && userId == parent.id) {
        // if userId exists and is equal to 'parent.id then => parent.email
        return parent.email
      } else { // otherwise => null
        return null
      }
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma }, info) {
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      })
    }
  }
}

export { User as default };
