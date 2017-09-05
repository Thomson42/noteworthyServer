const Folder = require('../../lib/models/folder');
const Note = require('../../lib/models/note');
const {assert} = require('chai');

describe('Folder model', () => {
    it('validates with only required fields', () => {
        const regularFolder = new Folder({
            title: 'regular folder'
        });
        return regularFolder.validate();
    });
    it('fails validation when required fields are missing', () => {
        const folder = new Folder();

        return folder.validate()
            .then( () => {
                throw new Error('Expected Validation error');
            }, ({errors}) =>{
                assert.ok(errors.title);
            });
    });
    it('validates with more than just the required fields', () => {
        const littleNote = new Note({
            title:'little note',
            description: 'A small reminder someone wrote.'
        });
        const mainFolder = new Folder({
            title:'main folder',
            children: []
        });
        const sillyFolder = new Folder({
            title: 'silly folder',
            parent: 'main folder'
        });
        const badFolder = new Folder({
            title: 'bad folder',
            parent: 'main folder'
        });
        const specialFolder = new Folder({
            title: 'special folder',
            children: [sillyFolder, badFolder],
            notes: [littleNote],
            parent: mainFolder
        });
        mainFolder.children.push(specialFolder);
        return specialFolder.validate();
    });
});
