var express = require('express');
const app = express();
var mysql = require('mysql');

var bodyparser = require('body-parser');

var connection = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:'user'
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/register/',(req,res,next)=>{

    var data = req.body;
    var Password = data.Password;
    var Email = data.Email;
    var Name = data.Name
            var insert_cmd = "INSERT INTO user_info(Email,Password,Name) values (?,?,?)";
            values =[Email,Password,Name];

            console.log("executing: "+insert_cmd +values);
            connection.query(insert_cmd,values,(err,results,feilds)=>{
                connection.on('error',(err)=>{
                    console.log("[MySQL ERROR]",err);
                });

                res.json(results);
                console.log("Registered Successfully.");
            });

});


app.get('/showusers/',(req,res)=>{

    connection.query("SELECT * FROM user_info ",(err,result)=>{

        connection.on('error',(err)=>{
            console.log("[MySQL ERROR]",err);
        });

        res.send(JSON.stringify(result));
    });
});

var server = app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
});