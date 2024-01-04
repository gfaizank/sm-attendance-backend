const express=require('express');
const cors=require('cors');
const mysql=require('mysql');

const app=express();


app.use(cors());
const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "second_medic"
})

app.post('/login', (req, res) => {
    const sql="SELECT * FROM login WHERE username= ? AND password= ?";

    db.query(sql, [req.body.username, req.body.password], (err, data) =>{
        if(err) return res.json("Login Failed");
        if(data.length > 0) return res.json("Login Successfully");
        else res.json("No Record");
    })
})

app.listen(8081, ()=>{
    console.log("Listening....");
})