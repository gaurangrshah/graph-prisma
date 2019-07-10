import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'thisisasecret', { expiresIn: '7 days' })
  // sign and return token using the user's id, with expiry set to 7 days
}

export { generateToken as default }
