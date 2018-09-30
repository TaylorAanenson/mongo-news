const express = require('express');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static('public'));

const newsRoutes = require('./routes/news.js');
app.use('/news',newsRoutes);

app.listen(3000,function(){
    console.log('Yo!');
});