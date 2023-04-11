const express = require("express");
const path = require("path");
const cors = require("cors");
const UserRouter = require("./Routes/User");
const BlogRouter = require("./Routes/Blog");
const AuthorRouter = require("./Routes/Author");
require("dotenv").config({ path: path.join(__dirname, './.env') });

const app = express();


app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/", express.json());
app.use("/user", UserRouter);
app.use("/blog", BlogRouter);
app.use("/author", AuthorRouter);


module.exports = app;
