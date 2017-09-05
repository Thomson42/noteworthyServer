const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const jsonParser = require('body-parser').json();

router
    .get('/:id', (req, res, next) => {
        Note.findById(req.params.id)
            .lean()
            .then(note => {
                if(!note) res.status(404).send(`Cannot GET ${req.params.id}`);
                else res.send(note);
            })
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Note.find()
            .lean()
            .select('__v title _id contents')
            .then(notes => res.send(notes))
            .catch(next);

    })
    .use(jsonParser)
    
    .post('/', (req, res, next) =>{
        const note = new Note(req.body);
        note
            .save()
            .then(note => res.send(note))
            .catch(next);
    });

module.exports = router;