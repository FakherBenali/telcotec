const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: { type: String, required: true },
    taskType: { type: String, required: true },
    description: { type: String },
    target: {
        sex: { type: String },
        ageRange: { type: [Number] },
        zone: { type: String }
    },
    numberOfEligibleUsers: { type: Number },
    price: { type: Number },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

module.exports = mongoose.model('task', taskSchema);
