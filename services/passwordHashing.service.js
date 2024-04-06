const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    return bcrypt.hash(password, 10)
}
const verifyPassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}

module.exports = {
    hashPassword, verifyPassword
}