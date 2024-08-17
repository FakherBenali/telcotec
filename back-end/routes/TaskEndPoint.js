const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const bro = require('../models/bro');

// Calculate number of eligible bros and price
const calculateEligiblebrosAndPrice = async (target) => {
    let query = {};
    if (target.sex) query.sex = target.sex;
    if (target.ageRange) query.age = { $gte: target.ageRange[0], $lte: target.ageRange[1] };
    if (target.zone) query.zone = target.zone;

    const bros = await bro.find(query);
    const numberOfEligiblebros = bros.length;
    const pricePerbro = 10; // Example price per bro
    const totalPrice = numberOfEligiblebros * pricePerbro;

    return { numberOfEligiblebros, totalPrice };
};

router.post('/tasks', async (req, res) => {
    try {
        const { taskName, taskType, description, target, startDate, endDate } = req.body;
        
        const { numberOfEligiblebros, totalPrice } = await calculateEligiblebrosAndPrice(target);

        const newTask = new Task({
            taskName,
            taskType,
            description,
            target,
            numberOfEligiblebros,
            price: totalPrice,
            startDate,
            endDate
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
