var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define the database schema 
var userSchema = new Schema( {
    id: String,
    type: String,
    title: String,
    content: String,
    snapshot: String,
    chart: {
        log : [
            {
                x : Date,
                y : Number
            }
        ],
        current: Number,
        total : Number        
    }
});



var Note = mongoose.model('Note', userSchema);

module.exports = Note;
