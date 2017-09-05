const Note = require('../../lib/models/note');
const {assert} = require('chai');

describe('Note model', () => {
    it('validates with only required fields', () => {
        const regularNote = new Note({
            title:'class notes'
        });
        return regularNote.validate();
    });
    it('fails validation when required fields are missing', () => {
        const badNote = new Note();

        return badNote.validate()
            .then( () => {
                throw new Error('Expected Validation error');
            }, ({errors}) =>{
                assert.ok(errors.title);
            });
    });
});