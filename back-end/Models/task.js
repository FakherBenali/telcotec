const mongoose = require('mongoose');


const Task = mongoose.model('task', {
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
    
})

module.exports = Task ; 