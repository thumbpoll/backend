const mongoose = require("../config/config");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const pollSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
    },
    timeLimit: {
      type: Date,
      default: () => {
        const date = new Date();
        return date.setDate(date.getDate() + 1);
      }
    },
    moderator: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    options: [
      {
        description: String,
        image: String
      }
    ]
  },
  {
    timestamps: true
  }
);

pollSchema.plugin(AutoIncrement, {
  id: "poll_counter",
  inc_field: "id"
});

const Polls = mongoose.model("Polls", pollSchema);

module.exports = Polls;

// {
//   title: String,
//   timeLimit: Date,
//   options: [
//     {
//       optionId: Number,
//       description: String,
//       image: String,
//       voters: [
//         {
//           userId: Number
//         }
//       ]
//     }
//   ]
// },
