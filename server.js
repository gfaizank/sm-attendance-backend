const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const bodyParser = require('body-parser');

const app=express();


app.use(cors());
app.use(bodyParser.json());


const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "second_medic"
})

app.use(bodyParser.json());

// Login
app.post('/login', (req, res) => {
    const sql="SELECT * FROM login WHERE username= ? AND password= ?";

    db.query(sql, [req.body.username, req.body.password], (err, data) =>{
        if(err) return res.json("Login Failed");
        if(data.length > 0) return res.json("Login Successfully");
        else res.json("No Record");
    })
})

//Personal_Details
app.post('/personal_details', (req, res) => {
    const {
      name,
      number,
      emailAddress,
      dob,
      gender,
      maritalStatus,
      bloodGroup,
      currentAddress,
      permanentAddress,
      guardianName,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactMobile,
      emergencyContactAddress,
    } = req.body;
  
    const sql = `
      INSERT INTO personal_details 
      (name, number, emailAddress, dob, gender, maritalStatus, bloodGroup, currentAddress, permanentAddress, guardianName, emergencyContactName, emergencyContactRelationship, emergencyContactMobile, emergencyContactAddress)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      name,
      number,
      emailAddress,
      dob,
      gender,
      maritalStatus,
      bloodGroup,
      currentAddress,
      permanentAddress,
      guardianName,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactMobile,
      emergencyContactAddress,
    ];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: 'Failed to save personal details.' });
      }
  
      return res.json({ success: true, message: 'Personal details saved successfully.' });
    });
  });
app.listen(8081, ()=>{
    console.log("Listening....");
})