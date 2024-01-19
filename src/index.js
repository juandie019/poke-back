const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { port } = require("./config");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use("/", routes);

app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
