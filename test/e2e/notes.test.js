const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('noteworthy api', () => {
    
    //before(db.drop);

    let README =  {
        title: 'README3',
        contens: 'Welcome to noteworthy I am not worthy'
    };
    let funnyJoke = {
        title:'Funny Joke',
        contens: 'Jokes on you there are no jokes'
    };
    let README4EVA = {
        title: 'README4EVA',
        contens: 'IDK what to put here this is for a rewrite test'
    }
    function saveNote(note) {
        return request
            .post('/api/notes')
            .send(note)
            .then(res => res.body);
    }
    it('roundtrips gets a new note', () => {
        return saveNote(funnyJoke)
            .then(saved => funnyJoke = saved),
            saveNote(README)
            .then(saved => {
                assert.ok(saved._id, 'saved has ID');
                README = saved;
            })
            .then(() => {
                return request.get(`/api/notes/${README._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, README);
            });
    });
    it('rewrites note data by id', () => {
        return request.put(`/api/notes/${README._id}`)
            //.set('Authorization', token)
            .send(README4EVA)
            .then(res => {
                assert.isOk(res.body._id);
                assert.equal(res.body.title,README4EVA.title);
                assert.equal(res.body.contens,README4EVA.contens);
            });
    });
    it('deletes note by id', () => {
        return request.delete(`/api/notes/${funnyJoke._id}`)
            //.set('Authorization', token)
            .then(res => {
                assert.deepEqual(JSON.parse(res.text), funnyJoke);
            });
    });
});