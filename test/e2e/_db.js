/* Let's connect to mongo once here */
process.env.MONGODB_URI = 'mongodb://localhost:27017/noteworthy-test';
require('../../lib/connect');
const connection = require('mongoose').connection;
const request = require('./_request');


/* export a small helper for dropping the db*/
module.exports = {
    drop() {
        return connection.dropDatabase();
    },
    getToken(user = { email: 'me@me.com', password: 'abc' }) {
        return request.post('/api/auth/signup')
            .send(user)
            .then(res => res.body.token);
    }
};