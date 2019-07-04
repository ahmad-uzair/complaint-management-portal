'use strict';

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const cors = require('cors');

const bodyParser = require('body-parser');

//const bcrypt = require('bcrypt');

//models

const Users = require('./models/user');
const Complaints=require('./models/complaint')

//connect server to mongoDB

+mongoose.connect(

    'mongodb://localhost:27017/complaints',

    { useNewUrlParser: true, useCreateIndex: true, }

);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


// retrieves all the complaints

app.get('/api/users/:email', (req, res) => {

    Users.find({email:'email'}).sort({updatedAt: 'descending'}).exec((err, user) => {

        if (err) return res.status(404).send('Error while getting notes!');

        return res.send({user});

    });

});

// create a new note

app.post('/api/users/create', (req, res) => {

    const user = new Users({name:req.body.data.name,email:req.body.data.email,pass:req.body.data.pass,IsAdmin: false});
    user.save( (err) => {

        if (err) return res.status(404).send({message: err.message});

        return res.send({ user });

    });

});








// retrieves all the complaints

app.get('/api/complaint/list', (req, res) => {

    Complaints.get((function(err, complaints) {
        if (err) return res.status(404).send('Error while getting complaints!');

        return res.send({complaints});

    }));

});

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

        return res.send({ message: 'note updated!', complaint });

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
