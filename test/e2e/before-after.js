//const connect = require('../../lib/connect');
// const mongoose = require('mongoose');
// mongoose.Promise = Promise;
// const child_process = require('child_process');
// const db = require('./_db');

// function connect (dbUri) {
//     const promise = mongoose.connect(dbUri).then( () => mongoose.connection );
//     mongoose.connect(dbUri);

//     mongoose.connection.on('connected', () => {
//         ('mongoose default connection open to ' + dbUri );
//     });

//     mongoose.connection.on('error', (err) => {
//         console.log('mongoose default connection error ' + err);//eslint-disable-line
//     });

//     mongoose.connection.on('disconnected', () => {
//         console.log('mongoose default connection disconnected');//eslint-disable-line
//     });

//     process.on('SIGINT', () => {
//         mongoose.connection.close(() => {
//             console.log('mongoose default connection disconnected through app termination');//eslint-disable-line
//             process.exit(0);
//         });
//     });
//     return promise;
// }


// let connection = null;
// before(() => {
//     return connect('mongodb://localhost:27017/sportsicle-test')
//         .then(cn => connection = cn);
// });
// before(db.drop);
// before(() => child_process.execSync('mongoimport --file ./lib/data/FolderData.json --jsonArray --db noteworthy-test --collection folders'));
// before(() => child_process.execSync('mongoimport --file ./lib/data/NoteData.json --jsonArray --db noteworthy-test --collection notes'));
// after(() => connection.close());