const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, DocumentSnapshot } = require("firebase-admin/firestore");

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

var express = require("express");
var app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

/*app.get("/", function (req, res) {
  res.render("sample");
});*/

/*app.get("/", function (req, res) {
  res.send("Hello World");
});*/
/*app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});*/
app.get("/loginnew", function (req, res) {
  res.render("loginpage.ejs", { title: "Login System" });
});
app.get("/signupnew", function (req, res) {
  res.sendFile(__dirname + "/websitesignup.html");
});
console.log(__dirname);
/*app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});*/
/*app.get("/signupSubmit", function (req, res) {
 // console.log(req.query.emailid);

  db.collection("users").add({
    email: req.query.emailid,
    firstname: req.query.firstname,
    lastname: req.query.lastname,
  });
});*/

app.get("/signupSubmit", (req, res) => {
  const Name = req.query.fname1;
  const Email = req.query.email1;
  const password = req.query.pass;
  db.collection("Customers")
    .add({
      Name: Name,
      Email: Email,
      password: password,
    })
    .then(() => {
      res.send("signup successfull");
    });
});

app.get("/loginSubmit", (req, res) => {
  const username = req.query.username;
  // console.log("Email",Email);
  const password = req.query.password;
  // console.log("Password",password);
  db.collection("Customers")
    .where("Name", "==", username)
    .where("password", "==", password)
    .get()
    .then((docs) => {
      //console.log(docs.size);
      if (docs.size > 0) {
        res.render(path.join(__dirname,"public","/App.js"));
        //res.render("website.js", { title: "Login System" })
        /*const path = require("C:\Users\rrrr\OneDrive\Documents\HTML\major_project\App.js")
        app.use('/static', express.static(path.join(__dirname, 'public')))*/
      } 
      else {
        res.send("Login Failed");
        // res.alert("Invalid Username or Password");
      }
    });
});

/*db.collection('users').where("email","==",req.query.emailid)
  if(docs.length>0)
});*/

app.listen(3000);
// localhost:3000