/**
 * Make any changes you need to make to the database here
 */
const bcrypt = require('bcryptjs');
const { User } = require('../models')
const users = require('./users.json')
async function up() {

  let newUsers = await Promise.all(users.map(async user => {
    let newUser = user
    // Generate a salt for passsword
    const salt = await bcrypt.genSalt(10);
    // Hash a password with salt all together
    const passwordHash = await bcrypt.hash(user.local.password, salt);
    newUser.local.password = passwordHash
    console.log(newUser)
    return newUser
  }))

  await User.create(newUsers)
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  await User.deleteMany({ "local.email": users.map(user => user.local.email) })
}

module.exports = { up, down };
