import bcrypt from 'bcryptjs'

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer')
  }

  return bcrypt.hash(password, 10)
  // hash will take in password and generate a hash with a length of 10 appended onto the hashed password.
}

export { hashPassword as default }
