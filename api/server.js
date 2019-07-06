'use strict';

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const flash=require('connect-flash')

const cors = require('cors');

const bodyParser = require('body-parser');

const session=require('express-session')
//const bcrypt = require('bcrypt');

//models

const Users = require('./models/user');
const Complaints=require('./models/complaint')

//connect server to mongoDB

+mongoose.connect(

    'mongodb://localhost:27017/complaints',

    { useNewUrlParser: true, useCreateIndex: true, }

).then(
        () => {console.log('Database connection is successful') },
        err => { console.log('Error when connecting to the database'+ err)}
    );

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));


app.use(session({ cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false}));
app.use(flash())

const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use('local',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(usernameField, passwordField, done) {
        Users.findOne({ email: usernameField }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(passwordField)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));


passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    Users.findById(id, function(err, user) {
        cb(err, user);
    });
});



app.use(passport.initialize())

app.use(passport.session())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


// app.get('/api/users/:email', (req, res) => {
//
//     Users.find({email:'email'}).sort({updatedAt: 'descending'}).exec((err, user) => {
//
//         if (err) return res.status(404).send('Error while getting notes!');
//
//         return res.send({user});
//
//     });
//
// });





//Login API
app.post('/api/login',(req,res,next)=>{
    if (req.body.data.email && req.body.data.password) {
        Users.authenticate(req.body.data.email, req.body.data.password, function (error, user) {
            if (error || !user) {
                console.log(error)
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                req.session.name=user.name;
                req.session.email=user.email;
                req.session.IsAdmin=user.IsAdmin
                res.send(user)
                // return next()
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }

})

// Registers a new user
app.post('/api/users/create', (req, res) => {

    const user = new Users({name:req.body.data.name,email:req.body.data.email,pass:req.body.data.password,IsAdmin: false});
    user.save( (err) => {

        if (err) return res.status(404).send({message: err.message});

        return res.send({ user });

    });

});



app.get("/api/users/current", (req, res) => {
    let sess=req.sessionStore.sessions
    let data={id:sess._id,name:sess.name, email:sess.email,IsAdmin: sess.IsAdmin}
    res.send(data)
})





// retrieves all the complaints

app.get('/api/complaint/list', (req, res) => {
    Complaints.get((function(err, complaints) {
        if (err) return res.status(404).send('Error while getting complaints!');

        return res.send({complaints});

    }));

});


app.post('/api/complaint',(req,res)=>{

    Complaints.find({filedBy:req.body.userData},function (err, result) {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})


// create a new complaint

app.post('/api/complaint/create', (req, res) => {

    const complaint = new Complaints({title: req.body.title,complaintType: req.body.complaintType, complaintStatus: req.body.complaintStatus, filedBy: req.body.filedBy});

    complaint.save( (err) => {

        if (err) return res.status(404).send({message: err.message});

        return res.send({ complaint });

    });

});

// update an existing note with the given object id

app.post('/api/complaint/update/:id', (req, res) => {

    let options = { new: true };

    Complaints.findByIdAndUpdate(req.params.id, req.body.data , options, (err, complaint) => {

        if (err) return res.status(404).send({message: err.message});

        return res.send({ message: 'Complaint updated!', complaint });

    });

});

// delete an existing note with the given object id

app.post('/api/complaint/delete/:id', (req,res) => {

    Complaints.findByIdAndRemove(req.params.id, (err) => {

        if (err) return res.status(404).send({message: err.message});

        return res.send({ message: 'Complaint deleted!' });

    });

});

const PORT = 5000;

app.listen(PORT);

console.log('api runnging on port ' + PORT + ': ');
