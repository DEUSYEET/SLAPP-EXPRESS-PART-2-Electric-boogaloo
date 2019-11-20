var mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
var currentdate = new Date();
var dateString = ((currentdate.getMonth() + 1) + "_" + currentdate.getDate() + "_" + currentdate.getFullYear());
var currentUser;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: String,
    ans1: String,
    ans2: String,
    ans3: String,
});


var User = mongoose.model('User_Collection', userSchema);

exports.index = (req, res) => {
    var lastVisited;
    res.cookie('lastVisit', dateString, {maxAge : 999999999999999});
    if(req.cookies.lastVisit) {
        lastVisited = req.cookies.lastVisit;
    } else {
        lastVisited = "This is your first time here!";
    }
    User.findById(currentUser.id, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            currentUser = user;
            res.render('index', {
                currentUser: user,
                lastVisit: lastVisited
            });
        }
    });
};

exports.login = (req, res) => {
    res.render('login');
};

exports.loginUser = (req, res) => {
    User.findOne({ 'username': req.body.username }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                currentUser = user;
                req.session.user = {
                    isAuthenticated: true
                }
            }
            res.redirect('/index');
        }
    });
};

exports.create = (req, res) => {
    res.render('signup', {
        title: 'Add Person'
    });
};


exports.createUser = (req, res) => {
    var user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        email: req.body.email,
        age: req.body.age,
        ans1: req.body.questionOne,
        ans2: req.body.questionTwo,
        ans3: req.body.questionThree
    });
    currentUser = user;

    user.save((err, user) => {
        if (err) return console.error(err);
        console.log(req.body.username + ' added');
    });

    req.session.user = {
        isAuthenticated: true
    }
    res.render('index', { currentUser: currentUser });
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
};

exports.edit = (req, res) => {
    res.render('infoUpdate', {
        user: currentUser
    });
};

exports.editUser = (req, res) => {
    if (req.body.password != '') {
        User.findByIdAndUpdate(currentUser.id, {
            $set: {
                'username': req.body.username,
                'password': bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                'email': req.body.email,
                'age': req.body.age,
                'ans1': req.body.questionOne,
                'ans2': req.body.questionTwo,
                'ans3': req.body.questionThree
            }
        }, (err, todo) => {
            if (err) throw err;
        });
    } else {
        User.findByIdAndUpdate(currentUser.id, {
            $set: {
                'username': req.body.username,
                'email': req.body.email,
                'age': req.body.age,
                'ans1': req.body.questionOne,
                'ans2': req.body.questionTwo,
                'ans3': req.body.questionThree
            }
        }, (err, todo) => {
            if (err) throw err;
        });
    }
    res.redirect('/index');
};
