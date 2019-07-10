import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query'
import Mutation from './Mutation';
import Subscription from './Subscription';
import Post from './Post';
import User from './User';
import Comment from './Comment';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
}

const fragmentReplacements = extractFragmentReplacements(resolvers)
// allows fragments to made available to any resolvers that need to utilize them.
// extractFragmentReplacements goes thru all of the resolvers and extracts and returns any fragments which are then saved ased fragmentReplacements and exported from here.

export { resolvers, fragmentReplacements }
