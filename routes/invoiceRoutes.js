const express = require('express');
const { upload, processInvoice } = require('../controllers/invoiceController');

const router = express.Router();

router.post('/upload', upload.single('invoice'), processInvoice);

module.exports = router;
