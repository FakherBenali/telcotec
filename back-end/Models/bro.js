const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const broSchema = new Schema({
    name: { type: String, required: true },
    sex: { type: String, required: true },
    age: { type: Number, required: true },
    zone: { type: String, required: true },
    // Additional fields specific to bros can be added here
});

module.exports = mongoose.model('bro', broSchema);
