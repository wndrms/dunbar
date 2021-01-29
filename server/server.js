const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./pool");
const app = express();

var corsOptions = {	
    origin: "http://localhost:3000"	
};	
app.use(cors(corsOptions));
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
            db.query("SELECT * FROM Influencer_data WHERE id=?", instagramid, (err, data2) => {
                if(!err) res.send({data: data, imgs: urls, line_data: data2});
                else res.send(err);
            })
        } 
        else res.send(err);
    })
})

app.get('/api/history', (req, res) => {
    db.query("SELECT * FROM SearchHistory order by Timestamp DESC", (err, data) => {
        if(!err) res.send({history: data});
        else res.send(err);
    })
})

app.post('/api/history/:id', (req, res) => {
    const instagramid = req.params.id;
    db.query("INSERT INTO SearchHistory(id) VALUE(?) ON duplicate key update id=?, Timestamp=current_timestamp()", [instagramid, instagramid], (err, data) => {
        if(!err) res.send({history: data});
        else res.send(err);
    })
})

app.post('/api/delete/history', (req, res) => {
    db.query("Delete from SearchHistory", (err, data) => {
        if(!err) res.send({history: data});
        else res.send(err);
    })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})