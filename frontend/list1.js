var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ListSchema   = new Schema({
    toDo: String
});

module.exports = mongoose.model('toDoList', ListSchema);