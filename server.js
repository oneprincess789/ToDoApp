// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static(__dirname + '/frontend'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 2023; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password@ds051635.mongolab.com:51635/todoapp1989'); // connect to our database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Connected to a database')
});

var List = require('./frontend/list1.js');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');

    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here

router.route('/list')

// create a bear (accessed at POST http://localhost:8080/api/bears)
.post(function (req, res) {

    var list = new List(); // create a new instance of the Bear model
    list.toDo = req.body.toDo; // set the bears name (comes from the request)

    // save the bear and check for errors
    list.save(function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'To Do created!'
        });
    });

})

.get(function (req, res) {
    List.find(function (err, toDos) {
        if (err)
            res.send(err);

        res.json(toDos);
    });
})

router.route('/list/:toDo_id')

.delete(function (req, res) {
    List.remove({
        _id: req.params.toDo_id
    }, function (err, toDo) {
        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });
    });
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function (req, res) {
    res.sendfile('./frontend/index.html');
});
