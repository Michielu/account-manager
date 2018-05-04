var ObjectID = require('mongodb').ObjectID;

var bycrypt = require("./util/passwords");
//Middleware functions

/**
 * 
 * @param {*} app Express instance 
 * @param {*} db Database
 */
module.exports = function (app, db) {
    //Insert new user 
    app.post('/createuser', (req, res) => {
        const user = {
            username: req.body.username.toLowerCase(),
            fn: req.body.fn,
            ln: req.body.ln,
            pwd: req.body.pwd,
            email: req.body.email.toLowerCase(),
            hash: ""
        };
        //Check if every field has been set accurately on client side

        //Check if username has been used yet. 
        const result = db.collection("users").find({ 'username': user.username }, { _id: 1, username: 1, email: 1 }).toArray((err, result) => {
            if (err) res.send(error);
            console.log("in call " + (result));
            if (result.length == 0) {
                //Hash Password
                let pwd = bycrypt.hash(user.pwd);
                console.log(pwd);


            } else {
                console.log("In invalid: " + result.length + result[1])
                res.send("Invalid username");
            }
        });
        user.pwd = "newpassword";
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has sending message' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    //Delete by id 
    app.delete('/deleteuser/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has deleting username' });
            } else {
                //Update? 
                res.send(item);
                /** Returns this on success
                 * {
                    "n": 1,
                    "opTime": {
                        "ts": "6542421526199664641",
                        "t": 1
                    },
                    "electionId": "7fffffff0000000000000001",
                    "ok": 1
                    }
                 */
            }
        })
    })

    //Have to have this in front of all the 'u/:id' or it'll think 'all' is an id
    app.get('/usernames', (req, res) => {
        db.collection("users").find({}, { _id: 1, username: 1 }).toArray((err, result) => {
            if (err) res.send(error);
            res.send(result);
        });
    });


    //Read
    app.get('/u/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('User ' + item.username + ' Found!');
                // console.log(item);
            }
        });
    })



    //Update
    app.put('/u/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id),
        };
        //Do some checks and stuff here
        if (!req.body.pwd || !req.body.username || !req.body.email || !req.body.notes) {
            res.send({ 'error': 'Something is missing' });
        }
        else {
            const note = { text: req.body.body, title: req.body.title };
            db.collection('notes').update(details, note, (err, result) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(note);
                }
            });
        }
    });

}

