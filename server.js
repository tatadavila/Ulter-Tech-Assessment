const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3030;

//app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "development.ultertechnologies.com",
  user: "ulter",
  password: "M4n1z4l3s",
  database: "TechAssessment_TD",
});

app.get("/", (req, res) => {
  res.send("This is the invoice API!");
});

app.get("/clients", (req, res) => {
  const sql = "SELECT * FROM Client";

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No results found");
    }
  });
});

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM Product";

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No results found");
    }
  });
});

app.get("/invoices", (req, res) => {
  const sql = "SELECT * FROM Invoice";

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No results found");
    }
  });
});

app.post("/createInvoice", async (req, res) => {
  const sql1 = "INSERT INTO Invoice SET ?";
  const sql2 = "INSERT INTO InvoiceProduct VALUES ?";

  const arrayOfPromises = [promisePool.query("SELECT ? AS ")];

  // const newDate = new Date();
  // console.log(newDate.toISOString().split("T")[0]);

  const invoiceHeader = {
    date: req.body.date,
    clientId: req.body.clientId,
    discount: req.body.discount,
    subTotal: req.body.subTotal,
    total: req.body.total,
  };

  connection.query(sql1, invoiceHeader, (error) => {
    if (error) throw error;
    res.send("Invoice successfully created!");
  });
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Database server working awesomely perfect!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
