const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
// Define schema for a user
const usr = new mongoose.Schema({
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

//authenticate input against database
usr.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var error = new Error('User not found.');
                error.status = 401;
                return callback(error);
            }
            else if(password===user._doc.pass)
                return callback(null,user)
            else
                return callback()
            // bcrypt.compare(password, user._doc.pass, function (err, result) {
            //     if (result === true) {
            //         return callback(null, user);
            //     } else {
            //         return callback();
            //     }
            // })
        });
}


usr.pre('save',function (next) {
    var user = this;
    bcrypt.hash(user._doc.pass,10,function(err,hash){
        if(err){
            return next(err)
        }
        usr.pass=hash;
        next();
    })
})


var User = mongoose.model('User', usr);
module.exports = User;
