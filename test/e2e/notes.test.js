const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;
const child_process = require('child_process');

describe('note api', () => {
    
    before(db.drop);
    before(() => child_process.execSync('mongoimport --file ./lib/data/FolderData.json --jsonArray --db noteworthy-test --collection folders'));
    before(() => child_process.execSync('mongoimport --file ./lib/data/NoteData.json --jsonArray --db noteworthy-test --collection notes'));
    let token = null;
    before(() => db.getToken().then(t => token = t));

    let README =  {
        title: 'README3',
        contens: 'Welcome to noteworthy I am not worthy'
    };
    before(() => {
        return request.post('/api/notes')
            .set('Authorization', token)
            .send(README)
            .then(res => res.body)
            .then(savedNote => README = savedNote);
    });
    let funnyJoke = {
        title:'Funny Joke',
        contens: 'Jokes on you there are no jokes'
    };
    let README4EVA = {
        title: 'README4EVA',
        contens: 'IDK what to put here this is for a rewrite test'
    };
    function saveNote(note) {
        return request
            .post('/api/notes')
            .set('Authorization', token)
            .send(note)
            .then(res => res.body);
    }
    it('roundtrips gets a new note', () => {
        return saveNote(funnyJoke)
            .then(saved => funnyJoke = saved)
            .then(saved => {
                assert.ok(saved._id, 'saved has ID');
                funnyJoke = saved;
            })
            .then(() => {
                return request
                .get(`/api/notes/${README._id}`)
                .set('Authorization', token);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, README);
            });
    });
    it('rewrites note data by id', () => {
        return request.put(`/api/notes/${README._id}`)
            .set('Authorization', token)
            .send(README4EVA)
            .then(res => {
                assert.isOk(res.body._id);
                assert.equal(res.body.title,README4EVA.title);
                assert.equal(res.body.contens,README4EVA.contens);
            });
    });
    it('deletes note by id', () => {
        return request
            .delete(`/api/notes/${funnyJoke._id}`)
            .set('Authorization', token)
            .then(res => {
                assert.deepEqual(JSON.parse(res.text), funnyJoke);
            });
    });
});