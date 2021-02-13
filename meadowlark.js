const express = require('express');

const app = express();
const fortune = require('./lib/fortune.js');




//set up handlebars view engine
var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));



app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/about', (req,res)=>{
    res.render('about',{fortune: fortune.getFortune()})
})

//custom 404 page
app.use((req,res)=>{
    res.status(404);
    res.render('404');
});

//custom 500 page
app.use((req,res)=>{
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'));