let mongoose = require('mongoose')
let Schema = mongoose.Schema

let usersSchema = new Schema({
  userID: String,
  username: String,
  role: String,
  password: String,
  phone: String,
  email: String,
  address: String,
  description: String,
  department: String,
  duties: String,
  configState: String,
  Function: Object
}, {versionKey: false}
)

module.exports = mongoose.model('Users', usersSchema, 'users')