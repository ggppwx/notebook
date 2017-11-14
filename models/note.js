
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define the database schema 
var userSchema = new Schema( {
    id: String,
    title: String,
    content: String,
    snapshot: String
});



var Note = mongoose.model('Note', userSchema);

module.exports = Note;