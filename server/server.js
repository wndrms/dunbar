const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./pool");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

const db = require("./config/db");

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Database"});
})

app.get('/api/influencer', (req, res) => {
    db.query("SELECT * FROM Influencer", (err, data) => {
        if(!err) res.send({data: data});
        else res.send(err);
    })
})

app.get('/api/info/:id', (req, res) => {
    const instagramid = req.params.id;
    var posts = [];
    var urls = [];
    db.query("SELECT * FROM Influencer WHERE id=?", instagramid, async(err, data) => {
        if(!err) {
            posts.push(data[0].post1);
            posts.push(data[0].post2);
            posts.push(data[0].post3);
            posts.push(data[0].post4);
            posts.push(data[0].post5);
            posts.push(data[0].post6);
            for(var i=0; i < posts.length ; i++){
                const [result, fields] = await pool.query("SELECT img FROM Post WHERE url=?", posts[i]);
                urls.push(result[0].img);
            }
            res.send({data: data, imgs: urls});
        } 
        else res.send(err);
    })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})