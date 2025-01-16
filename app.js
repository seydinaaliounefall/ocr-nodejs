const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fspath = require("path");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(express.json());

dotenv.config({ path: fspath.resolve(__dirname, "./config/config.env") });

const invoices = require('./routes/invoiceRoutes');

app.use("/api/v1", invoices);

module.exports = app;
