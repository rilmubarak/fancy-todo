const bcrypt = require('bcrypt')
const saltRounds = 10;

function hashPassword (password) {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function checkPassword (password, hashedPassword) {
    const result = bcrypt.compareSync(password, hashedPassword)
    return result
}

module.exports = { hashPassword, checkPassword }