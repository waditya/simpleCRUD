const express = require("express");
const app = express();
const sql = require("mssql");
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Config for your database
var sqlConfig = {  
    user: 'ttpuser', //update me
    password: 'Mastercard@1234',  //update me
    server: 'public-db-ttp-01.cfhqnax7m7yd.us-east-2.rds.amazonaws.com',  //update me
    database: 'EmployeeDB',  //update me
    pool: {
        max:10,
        min:0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
      }
}; 


app.post('/create', (req, res) => {
    
    // get the request parameters in for passing to the SQL query
    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    // connect to your database

    new sql.connect(sqlConfig, (err) => {
        if(err){
            console.log(err);
        }

        // Create rerquest object
        var request = new sql.Request();
        request.input('fname', sql.VarChar, req.body.fname)
        .input('lname', sql.VarChar, req.body.lname)
        .input('age', sql.Int, req.body.age)
        .input('country', sql.VarChar, req.body.country)
        .input('wage', sql.Float, req.body.wage)
        // Query to database and get the records
        request.query(
            'Insert into customer (fname, lname, age, country, wage ) VALUES (@fname,@lname,@age,@country,@wage)'
            ,(err,result) => {
            // console.log('Printing Result'+result);
                if(err){
                    console.log('There is error!!');
                    console.log(err);
                    sql.close();
                }else{
                    res.send("Record is added in the database!!");
                    sql.close();
                }
        });
    });
});

app.get('/seek', (req, res) => {



    // connect to the database
    new sql.connect(sqlConfig, (err) => {
        if(err){
            console.log(err);
        }

        // Create rerquest object
        var request = new sql.Request();

        // Query to database and get the records
        request.query('select * from Customer', (err,recordset) => {
            if(err){
                console.log(err);
                sql.close();
            }else{
                res.send(recordset);
                sql.close();
            }
        });
    });


});

app.get('/customers', (req, res) => {
        // connect to the database
        new sql.connect(sqlConfig, (err) => {
            if(err){
                console.log(err);
            }
    
            // Create rerquest object
            var request = new sql.Request();
    
            // Query to database and get the records
            request.query('select * from Customer', (err,result) => {
                if(err){
                    console.log(err);
                    sql.close();
                }else{
                    res.send(result);
                    sql.close();
                }
            });
        });    
});
app.listen(3001, ()=> {
    console.log("yey, your server is running!");
});



