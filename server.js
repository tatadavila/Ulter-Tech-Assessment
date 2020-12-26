require('dotenv').config()

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const qbRoutes = require("./routes/quarterback");

const app = express();

app.use(bodyParser.json());
app.use(qbRoutes);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
