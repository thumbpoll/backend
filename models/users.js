const mongoose = require('../config/config')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = mongoose.Schema(
  {
    fullName: String,
    email: {
      type: String,
      unique: true
    },
    password: String
  },
  {
    timestamps: true
  }
)

userSchema.plugin(AutoIncrement, {
  id: 'user_counter',
  inc_field: 'id'
})

const Users = mongoose.model('Users', userSchema)

module.exports = Users