import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth = true) => {
  // grab header from request -> clear token -> verify token

  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization
  // grab header from request for queries and mutations, or for subscriptions we grab authorization from context.

  // console.log("request.request.headers.authorization", request.request)
  // console.log("header", header)


  if (header) {
    // run the following only when header exists

    const token = header.replace('Bearer ', '')
    // removes the word 'Bearer'  from header and replaces it with: '' (empty string)
    const decoded = jwt.verify(token, 'thisisasecret')
    console.log('decoded', decoded)
    // verify the token using the secret we've used originally
    return decoded.userId;
  }

  if (requireAuth) {
    // if authorization is required and header does not exist throw error:
    throw new Error('authentication required')
  }

  return null
}

export { getUserId as default };
