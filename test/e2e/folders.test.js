const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;
//const child_process = require('child_process');

describe('noteworthy api', () => {
    
    before(db.drop);
    //before(() => child_process.execSync('mongoimport --file ./lib/bunnies/BunnyData.json --jsonArray --db image-gallery-test --collection bunnies'));
    
    let note = null;
    before(() => {
        return request.post('/notes')
            .send({name: 'universal notes'})
            .then(res => res.body)
            .then(savedNote => note = savedNote);
    });
    let MainFolder =  {
        title: 'Main Folder',
        children: [],
        notes: []
    };
    function saveFolder(folder) {
        folder.children = [{folder: folder._id}];
        folder.notes = [{note: note._id}];
        return request
            .post('/folders')
            .send(folder)
            .then(res => res.body);
    }

    // it('initial /GET returns a list of 3', () => {
    //     return request.get('/api/bunnies')
    //             .then(req => {
    //                 const bunnies = req.body;
    //                 assert.deepEqual(bunnies.length, 3);
    //             });
    // });
    it('roundtrip gets a new folder', () => {
        return saveFolder(MainFolder)
            .then(saved => {
                assert.ok(saved._id, 'saved has ID');
                MainFolder = saved;
            })
            .then(() => {
                return request.get(`/folders/${MainFolder._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, MainFolder);
            });
    });
});