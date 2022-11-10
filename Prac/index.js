const mongoose = require("mongoose");
const express = require('express');
const app = express();
const User = require('./models/user.js');

const userID = null

//Connection to the database
const mongoURl = 'mongodb+srv://testUser:testUser123@pracexam.gozz8kd.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURl)
    .then((result) => {
        //Determines the database is successfully connected
        console.log("The mongodb dtatbase is connected", result);
        app.listen(8000, (err)=>{
            console.log("From app.listen");
        })
    })
    .catch((err) => {
        //Prints the error to the terminal if there is an error occured
        console.log("There is an error", err);
    })

app.get('/addData', (res,req) => {
    console.log("The data is added");
    const user = new User({
        name: 'NewUser',
        age: 19,
        hobbies: 'Coding'
    });
    user.save().then((result) => {
        console.log("The result is", result._id);
        userID = result._id;
    })
    .catch((err) => {
        console.log("There is a error in saving the entered data to the database", err);
    })
})

app.get('/displayData', (req,res) => {
    User.find().then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log("The error in displaying data is", err);
    })
})

app.get('/editData', (req,res) => {
    const userID = '636c8d30d0e602c8d1ed5490';
    User.findByIdAndUpdate(userID, {name: 'UserEdited', age: 21})
    .then((result) => {
        console.log("The data is updated", result);
    })
    .catch((err) =>{
        console.log("There is an error in updating the data", err);
    })
})

app.get('/deleteData', (req,res) => {
    User.findByIdAndDelete(userID).then((result) => {
        const userID = '636c8d30d0e602c8d1ed5490';
        console.log("The data is deleted", result);
    })
    .catch((err) => {
        console.log("There is an error in deleting the data", err);
    })
})