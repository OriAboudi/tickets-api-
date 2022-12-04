const indexR = require("./index");
const usersR = require("./users");
const ticketsR = require("./tickets");
const categoriesR = require("./categories");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/tickets", ticketsR);
  app.use("/categories", categoriesR);
} 