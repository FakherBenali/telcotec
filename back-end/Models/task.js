const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    budget: {
        type: Number
    },
    depenses: {
        type: Number
    },
    photo: {
        type: String
    },
    type: {
        type: String
    },
    target: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);