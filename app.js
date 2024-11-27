const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const app = express();
app.use(cors());

const productRoute = require('./routes/product');

app.use(bodyParser.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(productRoute);



sequelize.sync()
.then((res)=>{
    app.listen(2000);
    // console.log(res);
})
.catch((err)=>{
    console.log(err);
})


