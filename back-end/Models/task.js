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
    number: {
        type: Number
    },
    price: {
        type: Number
    },
    photo: {
        type: String
    }
});

module.exports = mongoose.model('Task', TaskSchema);