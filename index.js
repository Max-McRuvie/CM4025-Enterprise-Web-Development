// Require express
const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");


const uri = "mongodb://localhost:27017";

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile)


app.get('/', function(req, res) {
    res.render('myWebPage.html');
})

app.get('/api/getPrice', function(req, res) {
    let s = req.query.salary;
    let d = req.query.days;
    console.log("Calculating price")
    console.log(s)
    console.log(d)
    dailyRate = s/365;
    price = Math.round(dailyRate * d);
    var roundToNearest = 50;
    roundedPrice = Math.round((price+roundToNearest)/roundToNearest) * roundToNearest // Always round up
    res.send(""+roundedPrice)
})

app.get('/api/storeQuote', function(req, res){
    //res.send("Hello world!")
    // Copied from front end
    var n = req.query.name
    var s = req.query.salary;
    var d = req.query.days;
    console.log("Storing quote: "+n+" "+s+" "+d)
    console.log("Mongo URI is "+uri)

    // Database stuff
    // Create a new MongoClient
    const client = new MongoClient(uri);
    async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        //await client.connect();
        // Establish and verify connection
        //await client.db("admin").command({ ping: 1 });
        //console.log("Connected successfully to server");
        console.log('Start the database stuff');
        //Write databse Insert/Update/Query code here..
        var dbo = client.db("mydb");
        var myobj = { quoteName: n, salary: s, days: d };
        await dbo.collection("quotes").insertOne(myobj, function(err, res) {
            if (err) {
                console.log(err); 
                throw err;
            }
            console.log("1 quote inserted");
        }); 
        console.log('End the database stuff');

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    }
    run().catch(console.dir);



    res.send("stored "+n)
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});