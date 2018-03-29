var ObjectID = require('mongodb').ObjectID;


/**
 * 
 * @param {*} app Express instance 
 * @param {*} db Database
 */
module.exports = function (app, db) {
    //Create
    app.post('/u', (req, res) => {
        const user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    //Have to have this in front of all the 'u/:id' or it'll think 'all' is an id
    app.get('/u/all', (req, res) => {
        db.collection("users").find({}, { _id: 0, username: 1 }).toArray((err, result) => {
            if (err) res.send(error);
            res.send(result);
        });
    });

    //Only get username and notes 
    app.get('/u/a', (req, res) => {
        db.collection("users").find({}, { _id: 0, username: 1, notes: 1 }).toArray((err, result) => {
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

    //Remove
    app.delete('/u/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        })
    })

    //Update
    app.put('/u/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            '_id': new ObjectID(id),
        };
        //Do some checks and stuff here
        if (!req.body.password || !req.body.username || !req.body.email || !req.body.notes) {
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



    //TODO learn how to update users correctly 
}