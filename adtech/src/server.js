const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require("./database/database");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");
const routes = require("./routes");

const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", "utf8"));

app.use(express.json());
app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize.sync().then(() => {
  console.log("Database synced");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
