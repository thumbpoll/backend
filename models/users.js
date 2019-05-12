const mongoose = require("../config/config");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

// User Schema
const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    polls: [
      {
        type: Schema.Types.ObjectId,
        ref: "polls"
      }
    ]
  },
  {
    timestamps: true
  }
);

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
userSchema.plugin(AutoIncrement, {
  id: "user_counter",
  inc_field: "id"
});

// User model => users collection
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
