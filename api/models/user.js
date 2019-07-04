var mongoose = require('mongoose')

// Define schema for a user
var usr = new mongoose.Schema({
        name: {
            type: String
        },
        email: {
            type: String
        },
        pass:{
            type:String,
        },
        IsAdmin:{
            type:Boolean
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('User', usr)
