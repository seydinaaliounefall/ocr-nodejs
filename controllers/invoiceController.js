const multer = require('multer');
const path = require('path');
const { extractTextFromImage } = require('../utils/ocr');
const Invoice = require('../models/Invoice');
const { log } = require('console');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const processInvoice = async (req, res) => {
    try {
      const filePath = path.join(__dirname, '../uploads/', req.file.filename);
      const text = await extractTextFromImage(filePath);


      // Check if text is a string and not empty
      if (typeof text !== 'string') {
        throw new Error('Extracted text is not a valid string or is empty');
      }

      // Extract data from text
      const invoiceNumberMatch = (/Invoice Number\s+(\S+)/).exec(text);
      const dateMatch = (/Date\s+(\d{2}\/\d{2}\/\d{4})/).exec(text);
      const vendorNameMatch = (/VendorName\s+(.+)/).exec(text);
      const totalAmountMatch = (/Total\s+(\d+)/).exec(text);

      console.log("Infos : ", invoiceNumberMatch, dateMatch, totalAmountMatch, vendorNameMatch);

      // Check if matches were successful
      if (!invoiceNumberMatch || !dateMatch || !totalAmountMatch || !vendorNameMatch) {
        throw new Error('Failed to extract necessary information from the text');
      }

      const invoiceNumber = invoiceNumberMatch[1];
      const date = new Date(dateMatch[1]);
      const totalAmount = parseFloat(totalAmountMatch[1]);
      const vendorName = vendorNameMatch[1];

      const invoice = await Invoice.create({ invoiceNumber, date, totalAmount, vendorName });

      console.log("invoiceNumber : ", invoiceNumber);
      console.log("date : ", date);
      console.log("totalAmount : ", totalAmount);
      console.log("vendorName : ", vendorName);
      console.log("----------------------------------");
      console.log("----------------------------------");
      console.log(invoice);

      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
};

module.exports = { upload, processInvoice };
