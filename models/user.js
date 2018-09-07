var moongose =  require('mongoose');   
var Schema = moongose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = moongose.model('User', userSchema);