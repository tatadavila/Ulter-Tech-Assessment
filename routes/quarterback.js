const express = require("express");
const { executeGetQuery, executePostInvoiceQuery } = require("../utils/query");

const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("This is the invoice API!");
});

Router.get("/clients", async (req, res) => {
  const sql = "SELECT * FROM Client";
  try {
    const result = await executeGetQuery(sql);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

Router.get("/products", async (req, res) => {
  const sql = "SELECT * FROM Product";
  try {
    const result = await executeGetQuery(sql);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

Router.get("/invoices", async (req, res) => {
  const sql = "SELECT * FROM Invoice";
  try {
    const result = await executeGetQuery(sql);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

Router.post("/createInvoice", async (req, res) => {
  const invoiceData = {
    date: req.body.date,
    clientId: req.body.clientId,
    discount: req.body.discount,
    subTotal: req.body.subTotal,
    total: req.body.total,
    products: req.body.products,
  };
  try {
    const result = await executePostInvoiceQuery(invoiceData);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = Router;
