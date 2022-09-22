const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    res.render("homepage")
});

router.get("/register", function(req, res) {
    res.render("register")

});

router.post('/register', async(req, res) => {
    // res.send("this is the first page")

    console.log("this is the post page");
    //res.send("user registered successfully")
    console.log(req.body);
    let { username, email, password1, password2 } = req.body;


    ///hashing the password

    if (password1 == password2) {
        console.log("the two password match")
        let email = req.body.email;
        conn.query(
            'SELECT * FROM Users where email=?', email,
            function(err, results, fields) {
                if (err) {
                    console.log("there was an error")
                } else {
                    if (results.length > 0) {
                        //console.log("email already exists")
                        res.render("register", { error: "Email Address Already Exists" })
                    } else {
                        console.log(password1)



                        bcrypt.hash(password1, 10, function(err, hash) {
                            if (err) {
                                console.log("there was an error")
                            } else {
                                req.session.userID = req.body.username;
                                req.session.userEmail = req.body.email;
                                req.session.userCounty = req.body.county;
                                req.session.gender = req.body.gender;
                                // console.log(req.session)


                                let sql = `insert into Users (Name,email, pass,gender,county)  VALUES('${username}','${email}', '${hash}','${req.body.gender}','${req.body.county}')`
                                conn.query(sql, function(err, results, fields) {
                                    if (err) {
                                        console.log("An error occuured");
                                        console.log(err.message)
                                    } else {
                                        console.log("information inserted sucessfully")
                                            //console.log(req.body)
                                        res.redirect("/dash")
                                    }

                                })






                            }

                        })










                    }
                }


            });







    } else {
        console.log("passwords")
        res.render("register", { error: "Passwords do not match" })

    }







    //console.log("user created successfully")

    //res.send("successfullty created account")


});

router.get("/login", function(req, res) {
    // res.send("this is the first page")
    res.render("login")

});

router.post('/login', function(req, res) {


    const username = req.body.username1;
    const password = req.body.password1;
    // console.log(req.body)
    conn.query(
        'SELECT * FROM Users where Name=?', username,
        function(err, results, fields) {
            if (err) {
                console.log("there was an error")
            } else {
                if (results.length > 0) {

                    let comparePassword = results[0].pass;
                    let myEmail = results[0].email;
                    //let myId = results[0].id;
                    let myCounty = results[0].county;
                    let myGender = results[0].gender;
                    let myService = results[0].Service;

                    bcrypt.compare(password, comparePassword,
                        function(err, result) {


                            if (result) {
                                //console.log("authentification finished")
                                //console.log(req.body)
                                req.session.userID = req.body.username1;
                                req.session.userEmail = myEmail;
                                //req.session.id = myId;
                                req.session.userEmail = myEmail;
                                req.session.userCounty = myCounty;
                                req.session.gender = myGender;
                                req.session.service = myService;
                                console.log(req.session)
                                    //req.session.authenticated = true;
                                    //console.log(req.session.authenticated)
                                    //req.session.userID = req.body.username;
                                    //console.log(req.session)
                                    //console.log(req.session)


                                res.redirect("/dash")


                            } else {
                                console.log("passwords do not match");
                                // alert("incorrect password")
                                // res.send({ message: "user password is incorrect" })
                                res.render("login", {
                                    error: "password is incorrect"
                                })
                                let error = "wrong password";
                                // res.redirect("/login")
                            }

                        }
                    );






                } else {
                    res.render("login", {
                        error: "Username Does not Exist"
                    })
                }
            }
        }
    )








});


router.get("/dash", (req, res) => {
    if (req.session.userID) {
        // console.log(req.session)


        console.log(req.session)


        res.render("dash", {
            username: req.session.userID,
            email: req.session.userEmail,
            id: req.session.id,
            service: req.session.service,
            address: req.session.userCounty,
            gender: req.session.gender,
            service_name: req.session.service_name,
            personel: req.session.personel,
            time: req.session.time




        })

    } else {
        console.log("there is no session")
        res.redirect("/login")
    }


})


router.get("/update", (req, res) => {
    res.render("update")



});
router.get("/book", function(req, res) {
    if (req.session.userID) {
        res.render("table")



    } else {
        res.redirect("/login")

    }
})

router.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/login")

})
router.post("/book", function(req, res) {
    // console.log(typeof(req.body))
    let selected = req.body;
    let sql3 = (
        `UPDATE Users SET Service = '${selected.service}' WHERE Users.email ='${req.session.userEmail}';
        `

    )
    conn.query(sql3, function(err, results, fields) {
        if (err) {
            console.log("an err happened :" + err)
        } else {
            console.log("isertion success");
            req.session.service = selected.service
                //console.log(req.session)



            let sql4 = `select name,time,personel from Services where Services.name='${req.session.service}';`;
            conn.query(sql4, function(err, results, fields) {
                if (err) {
                    console.log(err)
                } else {

                    req.session.personel = results[0].personel;
                    req.session.time = results[0].time;
                    req.session.service_name = results[0].name;
                    console.log("this is the new session")
                        // console.log(req.session)
                }
            })

        }
        res.redirect("/dash")
    })









});






module.exports = router;