const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type : String,
        required : true 
    },
    age: {
        type : Number,
        min: 18, 
        max: 65,
        required : true
    },
    hobbies: {
        type : String,
        required : true
    }
    
}, {timeStamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
