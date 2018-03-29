
var ObjectID = require('mongodb').ObjectID;


/**
 * 
 * @param {*} app Express instance 
 * @param {*} db Database
 */
module.exports = function (app, db) {

    //Create
    app.post('/notes', (req, res) => {
        // You'll create your note here.
        res.send('Hello')
        // const note = { text: req.body.body, title: req.body.title };
        // db.collection('notes').insert(note, (err, result) => {
        //     if (err) {
        //         res.send({ 'error': 'An error has occurred' });
        //     } else {
        //         res.send(result.ops[0]);
        //     }
        // });
    });

    //Read 
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' Read!');
            }
        });
    });

    //Remove
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        })
    })

    //Update
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        if (!req.body.body || !req.body.title) {
            res.send({ 'error': 'Either body or title is non existant' });
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


};