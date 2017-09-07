const express = require('express');
const router = express.Router();
const Folder = require('../models/folder');
const jsonParser = require('body-parser').json();

router
    .get('/:id', (req, res, next) => {
        Folder.findById(req.params.id)
            .lean()
            .then(folder => {
                if(!folder) res.status(404).send(`Cannot GET ${req.params.id}`);
                else res.send(folder);
            })
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Folder.find()
            .lean()
            .select('title _id folders __v')
            .then(folders => res.send(folders))
            .catch(next);

    })
    .use(jsonParser)
    
    .post('/', (req, res, next) =>{
        const folder = new Folder(req.body);
        folder
            .save()
            .then(folder => res.send(folder))
            .catch(next);
    })
    .put('/:id',(req, res, next) => {
        Folder.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(folder => res.send(folder))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Folder.findByIdAndRemove(req.params.id)
            .then(folder => res.send(folder))
            .catch(next);
    });

module.exports = router;