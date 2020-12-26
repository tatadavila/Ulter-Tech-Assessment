const mysqlConnection = require("./database");

const executeGetQuery = (sql) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(sql, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

// const executeInsertIntoQuery = (sql, data) => {
//   return new Promise((resolve, reject) => {
//     mysqlConnection.query(sql, data, (error) => {
//       if (error) reject(error);
//       resolve(results);
//     });
//   });
// };

const executePostInvoiceQuery = (invoiceAndProducts) => {
  try {
    return new Promise((resolve, reject) => {
      mysqlConnection.beginTransaction(async (error) => {
        const invoice = { ...invoiceAndProducts };
        delete invoice.products;
        const { products } = invoiceAndProducts;

        const number =
          (await executeGetQuery(
            "SELECT number FROM Invoice ORDER BY number desc limit 1"
          ).length) === 0
            ? await executeGetQuery("SELECT MAX(number)+1 FROM Invoice")
            : 1;
        invoice.number = number;
        // const invoiceResult = await executeInsertIntoQuery(
        //   "INSERT INTO Invoice SET ?",
        //   invoice
        // );
        mysqlConnection.query("INSERT INTO Invoice SET ?", invoice, (error) => {
          if (error) throw error;
          res.send("Invoice successfully created!");
        });
        console.log("PRODUCTS", products.map(item));
        await executeInsertIntoQuery(
          "INSERT INTO InvoiceProduct SET ?",
          products
        );
        if (error) reject(error);
        mysqlConnection.commit;
        resolve(results);
        mysqlConnection.end();
      });
    });
  } catch (error) {
    mysqlConnection.rollback;
  }
};

exports.executeGetQuery = executeGetQuery;
exports.executePostInvoiceQuery = executePostInvoiceQuery;
