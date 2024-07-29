const express = require('express');
const router = express.Router();
const Finance = require('../Models/finance');
const mongoose = require('mongoose');


// Create New Invoice


  router.post('/invoice', async (req, res) => {
    console.log('Received data:', req.body); // Add this line

    try {
      const { projectId, amount, status,userId } = req.body;
      
      // Validate projectId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        console.log("66691f03b58339509e21afb8")
        return res.status(400).json({ error: 'Invalid project ID' });
      }
  
      const newInvoice = new Finance({
        projectId: new mongoose.Types.ObjectId(projectId),
        userId,
        amount,
        status
      });
  
      await newInvoice.save();
      res.status(201).json(newInvoice);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  });
// Show Project Invoices
router.get('/project/:projectId', async (req, res) => {
  try {
    const invoices = await Finance.find({ projectId: req.params.projectId });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pay Invoice
router.post('/pay/:id', async (req, res) => {
    try {
      const financeId = req.params.id;
      const updatedFinance = await Finance.findByIdAndUpdate(financeId, { status: 'paid' }, { new: true });
  
      if (!updatedFinance) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      res.json(updatedFinance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


// Summary Table
router.get('/summary', async (req, res) => {
  try {
    console.log('Starting aggregation');
    const summary = await Finance.aggregate([
      {
        $group: {
          _id: {            financeId: '$_id',  // Include the finance _id here
            projectId: '$projectId', userId: '$userId' },
          totalAmount: { $sum: '$amount' },
          totalPaid: {
            $sum: {
              $cond: [{ $eq: ['$status', 'paid'] }, '$amount', 0],
            },
          },
          totalUnpaid: {
            $sum: {
              $cond: [{ $eq: ['$status', 'unpaid'] }, '$amount', 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: '_id.projectId',
          foreignField: '_id',
          as: 'project',
        },
      },
      {
        $unwind: { path: '$project', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id.userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 0,
          financeId: '$_id.financeId',
          projectId: '$_id.projectId',
          projectName: '$project.name', // Changed from 'title' to 'name' based on your Task schema
          userId: '$_id.userId',
          userName: { $concat: ['$user.firstname', ' ', '$user.lastname'] }, // Concatenating first and last name
          totalAmount: 1,
          totalPaid: 1,
          totalUnpaid: 1,
        },
      },
    ]);

    console.log('Aggregation result:', summary);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all unpaid invoices
router.get('/unpaid', async (req, res) => {
    try {
    const unpaidInvoices = await Finance.find({ status: 'unpaid' })
      .populate({
        path: 'userId',
        select: 'firstname lastname' // Select only the firstname and lastname fields from User
      })
      .populate('projectId', 'name'); // Optionally populate the project name if needed

    // Map the results to include user details in a more friendly format
    const formattedInvoices = unpaidInvoices.map(invoice => ({
      _id: invoice._id,
      amount: invoice.amount,
      status: invoice.status,
      date: invoice.date,
      projectId: invoice.projectId,
      projectName: invoice.projectId ? invoice.projectId.name : null,
      user: invoice.userId ? {
        firstName: invoice.userId.firstname,
        lastName: invoice.userId.lastname
      } : null
    }));

    res.json(formattedInvoices);

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  });

// Get all paid invoices
router.get('/paid', async (req, res) => {
    try {
      const paidInvoices = await Finance.find({ status: 'paid' })
      .populate({
        path: 'userId',
        select: 'firstname lastname' // Select only the firstname and lastname fields from User
      })
      .populate('projectId', 'name'); // Optionally populate the project name if needed

    // Map the results to include user details in a more friendly format
    const formattedInvoices = paidInvoices.map(invoice => ({
      _id: invoice._id,
      amount: invoice.amount,
      status: invoice.status,
      date: invoice.date,
      projectId: invoice.projectId,
      projectName: invoice.projectId ? invoice.projectId.name : null,
      user: invoice.userId ? {
        firstName: invoice.userId.firstname,
        lastName: invoice.userId.lastname
      } : null
    }));

    res.json(formattedInvoices);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  });


// Show details of a specific invoice
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Finance.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
