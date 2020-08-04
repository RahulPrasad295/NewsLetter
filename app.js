//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const app = express();
const https = require("https");

const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var FirstName = req.body.fname;
    var LastName = req.body.lname;
    var emailid = req.body.emailp;
    
    var data = {
        members: [
            {
                email_address: emailid,
                status: "subscribed",
                merge_fields: {
                    FNAME: FirstName,
                    LNAME: LastName
                }
            }
        ]
    
    };
    var jsonData = JSON.stringify(data);
    
    const url = 'https://us17.api.mailchimp.com/3.0/lists/ad8e527296'
    
    const options = {
        method: "POST",
        auth: "rahul29:9f983b78cadc4eece29faf6af03817fb-us17"
    }
    
    const request = https.request(url, options, function (response) {

        if( response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname+ "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    
    })
    
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || port, function () {
    console.log("port is started on 3000.")
});



//ad8e527296

// 9f983b78cadc4eece29faf6af03817fb-us17