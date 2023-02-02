// Require express
const express = require('express');
const app = express();

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile)


app.get('/', function(req, res) {
    res.render('myWebPage.html');
})

app.get('/api/getPrice', function(req, res) {
    var s = req.query.salary;
    var d = req.query.days;
    console.log("Calculating price")
    console.log(s)
    console.log(d)
    dailyRate = s/365;
    price = Math.round(dailyRate * d);
    var roundToNearest = 50;
    roundedPrice = Math.round((price+roundToNearest)/roundToNearest) * roundToNearest // Always round up
    res.send(""+roundedPrice)
})

app.listen(3000);