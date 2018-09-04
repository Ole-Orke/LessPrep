const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
});

const Table = mongoose.model("Table", tableSchema);

module.exports = {
  Table: Table,
}
