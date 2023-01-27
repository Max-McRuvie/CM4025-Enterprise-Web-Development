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

app.listen(3000);