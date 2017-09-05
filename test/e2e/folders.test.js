const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;
const child_process = require('child_process');

describe('noteworthy api', () => {
    
    before(db.drop);
    //before(() => child_process.execSync('mongoimport --file ./lib/bunnies/BunnyData.json --jsonArray --db image-gallery-test --collection bunnies'));
    
    it('initial /GET returns a list of 3', () => {
        return request.get('/api/bunnies')
                .then(req => {
                    const bunnies = req.body;
                    assert.deepEqual(bunnies.length, 3);
                });
    });
});