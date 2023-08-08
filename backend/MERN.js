var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json()); //object format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/empdb');

var personSchema = mongoose.Schema({
    UserId: String,
    Firstname: String,
    Email: String,
    Password: String,
    Country: String,
    Mobile: Number,

});

var Userlist = mongoose.model("Userlist", personSchema);

// Code for Signup form

app.post('/signup', async (req, res) => {
    formdata = req.body;
    console.log("formdata ", formdata);
    if (!formdata.Name || !formdata.Email || !formdata.Password || !formdata.Country || !formdata.Mobile) {
        res.send({
            status: 201,
            msg: "Invalid data found or some fields are empty ! "
        });

    } else {
        let Fname = formdata.Name;
        uid = Fname.substring(0, 4);
        uid = uid + "_" + Math.floor(Math.random() * 100000);
        console.log('This is register function ', uid);

        var Newuser = new Userlist({
            UserId: uid,
            Firstname: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password,
            Country: req.body.Country,
            Mobile: req.body.Mobile,

        });
        try {
            let result = await Newuser.save();
            console.log(result);
            res.send({
                status: 200,
                msg: "User added successfully ",
                data: {
                    userid: uid
                }
            })
        } catch (err) {
            // res.send(err);
            res.send({
                status: 201,
                msg: err
            })
        }
    }
});

//Code for Login form

app.post('/login', async function (req, res) {
    console.log('login');
    var loginformdata = req.body;
    console.log("loginformdata = ", loginformdata);

    if (loginformdata.Userid == "admin" && loginformdata.Password == "admin") {

        try {
            let result = await Userlist.find().catch((err) => console.log(err));
            console.log(result);
            res.send({
                status: 200,
                msg: "User added successfully ",
                data: result
            })
        } catch (err) {
            res.send({
                status: 202,
                msg: err,
            })
        }
    } else {
        if (!loginformdata.Userid || !loginformdata.Password) {
            res.send({
                status: 202,
                msg: "Values cannot be blank ",
            })
        } else {
            console.log(loginformdata);
            try {
                let result = await Userlist.find({ UserId: loginformdata.Userid, Password: loginformdata.Password }).catch(err => console.log(err));
                console.log("result", result);
                console.log("New values");
                if (result != null) {
                    res.send({
                        status: 201,
                        msg: "User found successfully ",
                        data: result[0]
                    })
                }
            } catch (err) {
                res.send({
                    status: 202,
                    msg: err,
                })
            }
        }
    }
});

//Code for Update form

app.post("/update", async (req, res) => {

    var updatedata = req.body;
    console.log("updatedata ", updatedata);
    try {
        await Userlist.updateOne(
            { UserId: updatedata.UserId }, //condition to check
            {
                Firstname: updatedata.Firstname,
                Email: updatedata.Email,
                Password: updatedata.Password,
                Country: updatedata.Country,
                Mobile: updatedata.Mobile
            })
            .catch((err) => console.log(err));

        let result = await Userlist.find().catch((err) => console.log(err));
        console.log(result);
        res.send({
            status: 200,
            msg: "Updated successfully ",
            data: result
        })

        // res.send({
        //     status: 200,
        //     msg: "Updated Successfully",
        //     // data: result
        // });
    } catch (error) {
        console.log(error);
        res.send({
            status: 202,
            msg: error,
        })

    }
});

//Code for Delete button

app.post('/deleteuser', async (req, res) => {
    var Deleteid = req.body.Userid;
    console.log("Received as", Deleteid)
    try {
        await Userlist.deleteOne({ UserId: Deleteid }).catch(err => console.log(err));
        let result = await Userlist.find().catch((err) => console.log(err));
        console.log(result);
        res.send({
            status: 200,
            msg: "User Deleted successfully ",
            data: result
        })

    } catch (error) {
        console.log(err);
    }
});

app.listen(8000);
console.log("Server is running on port 8000");

