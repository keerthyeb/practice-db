let express = require("express");
let bodyParser = require("body-parser");
let mysql = require("mysql");
let app = express();

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "users"
});

connection.connect(function(error) {
  if (error) console.log(error);
  else console.log("connected");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.post("/addUser", function(req, res) {
  let body = JSON.parse(req.body);
  let user = body.user;
  connection.query(`insert into user (name) values ("${user}");`, (error, result, fields) => {
    connection.query(`select count(*) as count from user`, (error, result, fields) => {
      let count = result[0].count;
      res.send(count.toString());
    });
  });
});

app.listen(4000, () => {
  console.log("listening in 4000");
});
