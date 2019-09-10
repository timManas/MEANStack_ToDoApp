// Remember: You need to Install Express everytime for every new project created
let express = require("express")       

// Remember: You need to Install MongoDB as well for every new project
let mongodb = require("mongodb")

// package.json is the receipe list of this applicaition
let app = express()

// Create db variable
let db

app.use(express.static('public'))   // Make contents of this folder available in root server

// Paste this from the MongoDB website
let connectionString = "mongodb+srv://timmanas:Apple@cluster0-9czdc.mongodb.net/ToDoApp?retryWrites=true&w=majority"

// Set up the connection to the MongoDB Server. This is also where we instantiate the global variable db
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    db = client.db()
    app.listen(3000)    // This is what actually makes your app listen for request
})

app.use(express.json())

// We need to add Boilerplate code to include a body object to the request. Access users form data
// It parses incoming requests with urlencoded payloads and is based on body-parser.
// IF YOU COMMENT THIS LINE, THE PAGE WILL BE BLANK when you submit
app.use(express.urlencoded({extended: false}))

// This is the initial get response if we hit the "Homepage which is just '/' "
// If someone gets a Get response with "/", then we do whatever the function tells us to do =)
app.get("/", function(req,res){

    // Fetch all the documents in the DB 
    db.collection("items").find().toArray(function(err, items){
        
        // When sending we use "BACK TICKS `` and NOT quotations"
        res.send(`<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Simple To-Do App</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        </head>
        <body>
          <div class="container">
            <h1 class="display-4 text-center py-1">To-Do App !!! </h1>
            
            <div class="jumbotron p-3 shadow-sm">
              <form id="create-form" action="/create-item" method="POST">
                <div class="d-flex align-items-center">
                  <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                  <button class="btn btn-primary">Add New Item</button>
                </div>
              </form>
            </div>
            
            <ul id="item-list" class="list-group pb-5">
              ${items.map(function(item) {

                  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                  <span class="item-text">${item.text}</span>
                  <div>
                    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
                  </div>
                </li>`
              }).join("")}
            </ul>
            
          </div>
        
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>  
        <script src="/browser.js"></script>  
        </body>
        </html>`)


    })       // Leaving find no arguments gets All documents in collection


})

app.post("/create-item", function(req, res){
    // console.log(req.body.item)              // Notice we are referring to request object and internal details ...body.items
    
    // Remmeber MongoDB can contain multiple collection
    db.collection("items").insertOne({text: req.body.text}, function(err, info){
        // res.send("Thanks for Submitting")       // We wait until DB saves data onto DB
        // res.redirect("/")
        // res.send("Success")
        res.json(info.ops[0])
    }) 
    
})

app.post("/update-item", function(req, res) {
    db.collection("items").findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)}, {$set: {text: req.body.text}}, function() {
        res.send("Success")
    })
})

app.post("/delete-item", function(req, res) {
    db.collection("items").deleteOne({_id: new mongodb.ObjectID(req.body.id)}, function() {
        res.send("Success")
    })
})



/**
Notes
1. Expresso was used to connect to Server
2. Used NodeMon (downloaded using npm) to set up automatic restart of server everytime file is saved
    - installed using npm install nodemon
    - Run it "npm run watch"

3. Installed MongoDb (
    - Using npm install mongodb
)

4. `` - Back ticks allow user to do something dynamic in the String compared to normal Quotation marks

 */