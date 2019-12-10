const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/tacoTuesday', {
    useNewUrlParser: true
});

/*-------------------ATTENDEES-------------------------*/

const attendeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    partySize: { type: Number, default: 0 },
    phone: String,
    message: String,
});

const Attendee = mongoose.model('attendee', attendeeSchema);

// Add a new attendee to the database
app.post("/api/attendees", async(req, res) => {
    const attendee = new Attendee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        partySize: req.body.partySize,
        phone: req.body.phone,
        message: req.body.message
    });
    try {
        console.log("attendee posted: ", attendee);
        await attendee.save();
        res.send(attendee);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// Get a list of all the attendees
app.get('/api/attendees', async(req, res) => {
    try {
        let attendees = await Attendee.find();
        res.send(attendees);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/attendees/:id', async(req, res) => {
    console.log("in delete: ", req.params.id);
    try {
        Attendee.deleteOne({ _id: req.params.id }, function(err) {
            if (err) console.log(err);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

/*-------------------REVIEWS-------------------------*/

const reviewerSchema = new mongoose.Schema({
    review: String,
    firstName: String,
    lastName: String,
});

const Review = mongoose.model('reviewer', reviewerSchema);

// Add a new review to the database
app.post("/api/reviews", async(req, res) => {
    const review = new Review({
        review: req.body.review,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    try {
        console.log("review posted: ", review);
        await review.save();
        res.send(review);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// Get a list of all the reviews
app.get('/api/reviews', async(req, res) => {
    try {
        let reviews = await Review.find();
        res.send(reviews);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/reviews/:id', async(req, res) => {
    console.log("in delete: ", req.params.id);
    try {
        Review.deleteOne({ _id: req.params.id }, function(err) {
            if (err) console.log(err);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3005, () => console.log('Server listening on port 3005!'));
