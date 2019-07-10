import getUserId from '../utils/getUserId';

const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId // looks for postId off of the post object
            }
          }
        }
      }, info)
    }
  },
  post: {
    subscribe(parent, { published }, { prisma }, info) {
      return prisma.subscription.post({
        where: {
          node: {
            published
          }
        }
      }, info)
    }
  },
  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info)
    }
  },
}

export { Subscription as default };

