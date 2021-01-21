var mysql = require("mysql");
const db = mysql.createPool({
    host : "101.101.217.129",
    user : "root",
    password : "todayzero159",
    database : "Instagram"
});

module.exports = db;