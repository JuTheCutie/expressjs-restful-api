const mongoose = require('mongoose');
const keys = require('../keys/key');


const db = {
    connect: () => {
        mongoose.connect(keys.mongoDbServerString,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            if (err) {
                throw err;
            } else {
                console.log("Connected to the database");
            }
        });
    }
}

module.exports = db;