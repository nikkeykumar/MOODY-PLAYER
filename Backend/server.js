const app = require("./src/app");
const dbconnection = require("./src/db/dbConnection");
require("dotenv").config();
dbconnection();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
 