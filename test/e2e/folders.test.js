const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;
const child_process = require('child_process');

describe('noteworthy api', () => {
    
    before(db.drop);
    before(() => child_process.execSync('mongoimport --file ./lib/data/FolderData.json --jsonArray --db noteworthy-test --collection folders'));
    before(() => child_process.execSync('mongoimport --file ./lib/data/NoteData.json --jsonArray --db noteworthy-test --collection notes'));    

    let note = null;
    before(() => {
        return request.post('/api/notes')
            .send({title: 'README2'})
            .then(res => res.body)
            .then(savedNote => note = savedNote);
    });
    let newFolder =  {
        title: 'New Folder',
        notes: []
    };
    const favorites = {
        title: 'favorites',
        notes: []
    };
    let crazyFolder = {
        title: 'crazy ideas'
    };
    function saveFolder(folder) {
        folder.notes = [{note: note._id}];
        return request
            .post('/api/folders')
            .send(folder)
            .then(res => res.body);
    }

    it('initial /GET returns a main folder', () => {
        return request.get('/api/folders')
                .then(req => {
                    const folders = req.body;
                    assert.deepEqual(folders[0].title, 'Main Folder');
                });
    });
    it('roundtrips gets a new folder', () => {
        return saveFolder(crazyFolder)
        .then(saved => crazyFolder = saved),
        saveFolder(newFolder)
            .then(saved => {
                assert.ok(saved._id, 'saved has ID');
                newFolder = saved;
            })
            .then(() => {
                return request.get(`/api/folders/${newFolder._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, newFolder);
            });
    });
    it('rewrites folder data by id', () => {
        return request.put(`/api/folders/${newFolder._id}`)
            //.set('Authorization', token)
            .send(favorites)
            .then(res => {
                assert.isOk(res.body._id);
                assert.equal(res.body.title,favorites.title);
            });
    });
    it('deletes folder by id', () => {
        return request.delete(`/api/folders/${crazyFolder._id}`)
            //.set('Authorization', token)
            .then(res => {
                assert.deepEqual(JSON.parse(res.text), crazyFolder);
            });
    });
});