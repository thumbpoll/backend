const mongoose = require("../config/config");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

// CREATE OPTION SCHEMA
const optionSchema = Schema({
  description: {
    type: String,
    required: true
  },
  pollId: {
    type: Schema.Types.ObjectId,
    ref: "Polls"
  },
  voters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ]
});

optionSchema.plugin(AutoIncrement, {
  id: "option_counter",
  inc_field: "id"
});

const Options = mongoose.model("Options", optionSchema);
module.exports = Options;
