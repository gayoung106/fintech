var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar", phone: "01024200872" }, "shhhhh");

console.log(token);
