const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('noteworthy api', () => {
    
    //before(db.drop);

    let README =  {
        title: 'README3',
        description: 'Welcome to noteworthy I am not worthy'
    };
    function saveNote(note) {
        return request
            .post('/api/notes')
            .send(note)
            .then(res => res.body);
    }
    it('roundtrips gets a new note', () => {
        return saveNote(README)
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
});