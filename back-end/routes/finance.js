const express = require('express');
const router = express.Router();
const Finance = require('../Models/finance');
const Task = require('../Models/task');


// Create New Invoice
router.post('/invoice', async (req, res) => {
    try {
      const newInvoice = new Finance(req.body);
      await newInvoice.save();
      res.status(201).json(newInvoice);
    } catch (error) {
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
    const summary = await Finance.aggregate([
      {
        $group: {
          _id: '$projectId',
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
          localField: '_id',
          foreignField: '_id',
          as: 'project',
        },
      },
      {
        $unwind: '$project',
      },
      {
        $project: {
          _id: 0,
          projectId: '$_id',
          projectName: '$project.title',
          totalAmount: 1,
          totalPaid: 1,
          totalUnpaid: 1,
        },
      },
    ]);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all unpaid invoices
router.get('/unpaid', async (req, res) => {
    try {
      const unpaidInvoices = await Finance.find({ status: 'unpaid' });
      res.json(unpaidInvoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get all paid invoices
router.get('/paid', async (req, res) => {
    try {
      const paidInvoices = await Finance.find({ status: 'paid' })
      res.json(paidInvoices);
    } catch (error) {
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
