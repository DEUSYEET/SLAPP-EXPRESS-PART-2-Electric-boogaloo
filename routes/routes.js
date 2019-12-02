var mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const fetch = require("node-fetch");
var currentdate = new Date();
var dateString = ((currentdate.getMonth() + 1) + "_" + currentdate.getDate() + "_" + currentdate.getFullYear());
var currentUser;

var eyes = ['eyes1','eyes2','eyes3','eyes4','eyes5','eyes6','eyes7','eyes9','eyes10'];
var noses = ['nose2','nose3','nose4','nose5','nose6','nose7','nose9'];
var mouths = ['mouth1','mouth3','mouth5','mouth6','mouth7','mouth9', 'mouth10', 'mouth11'];

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var userSchema = mongoose.Schema({
    eye: String,
    nose: String,
    mouth: String,
    color: String,
    avatarSource: String,
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
    var lastVisited = "This is your first time here!";
    res.cookie('lastVisit', dateString, {maxAge : 999999999999999});
    if(req.cookies.lastVisit) {
        lastVisited = req.cookies.lastVisit;
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
    User.findOne({
        'username': req.body.username
    }, (err, user) => {
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
    var eye = eyes[Math.floor(Math.random() * eyes.length)];
    var nose = noses[Math.floor(Math.random() * noses.length)];
    var mouth = mouths[Math.floor(Math.random() * mouths.length)];
    var color = Math.floor(Math.random()*16777215).toString(16);
    
    var user = new User({
        eye: `${eye}`,
        nose: `${nose}`,
        mouth: `${mouth}`,
        color: `${color}`,
        avatarSource: `https://api.adorable.io/avatars/face/${eye}/${nose}/${mouth}/${color}/abott@adorable.png`,
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
        user: currentUser,
        eyes: eyes,
        noses: noses,
        mouths: mouths,
    });
};

exports.editUser = (req, res) => {

    var eye = req.body.selectEye;
    var nose = req.body.selectNose;
    var mouth = req.body.selectMouth;
    var color = req.body.selectColor.substr(1);

    if (req.body.password != '') {
        User.findByIdAndUpdate(currentUser.id, {
            $set: {
                'eye': `${eye}`,
                'nose': `${nose}`,
                'mouth': `${mouth}`,
                'color': `${color}`,
                'avatarSource': `https://api.adorable.io/avatars/face/${eye}/${nose}/${mouth}/${color}/abott@adorable.png`,
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
                'eye': `${eye}`,
                'nose': `${nose}`,
                'mouth': `${mouth}`,
                'color': `${color}`,
                'avatarSource': `https://api.adorable.io/avatars/face/${eye}/${nose}/${mouth}/${color}/abott@adorable.png`,
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

exports.userData = (req, res) => {
    // console.log("Getting Data")
    var data;
    User.find({}, (err, docs) => {
        if (err) {
            throw err;
        }
        data = docs;
        // console.log(data);
        res.send(data);
    });
    // console.log("Data Sent")
}

exports.viewData = (req, res) => {
    var url = "http://localhost:3000/api";
    fetch(url).then(resp => {
        return resp.text();
    }).then(data => {
        var userData = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        JSON.parse(data, (key, val) => {
            switch (key) {
                case "ans1":
                    switch (val) {
                        case "Male":
                            userData[0][0] += 1;
                            break;
                        case "Female":
                            userData[0][1] += 1;
                            break;
                        case "Other":
                            userData[0][2] += 1;
                            break;
                    }
                    break;
                case "ans2":
                    switch (val) {
                        case "Warm":
                            userData[1][1] += 1;
                            break;
                        case "Cold":
                            userData[1][2] += 1;
                            break;
                        case "Hot":
                            userData[1][0] += 1;
                            break;
                    }
                    break;
                case "ans3":
                    switch (val) {
                        case "Yes":
                            userData[2][0] += 1;
                            break;
                        case "Definitely Yes":
                            userData[2][1] += 1;
                            break;
                        case "No(Wrong Answer)":
                            userData[2][2] += 1;
                            break;
                    }
                    break;
            }
        });
        //Anything that needs to be done with the user data must be done here
        
        
        
        res.render("apiData", {
            data: userData
        })
        
        
        
        
        
        
    }).catch(err => {
        console.log(err);
    });

}
