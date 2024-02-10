const express = require("express");
const path = require("path");

const checkListRouter = require("./src/routes/checklist");
const rootRouter = require("./src/routes/index");
const methodOveride = require("method-override");

require("./config/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method", { methods: ["POST", "GET"] }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/checkList", checkListRouter);
app.use("/", rootRouter);

app.listen(3001, () => {
  console.log("server ON");
});

//Nodemon: ele vai reiniciar o servidor automaticamente toda vez que tiver alteração no codigo!
// npm install Nodemon.
