const express = require('express');
const app = express();
const db = require('./src/app/config/index');
const route = require('./src/Routes');
const cors = require('cors')
const morgan = require('morgan');
const path = require("path")
require('dotenv').config();

const port = process.env.POST || 2105;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public')); 
// morgan debug log server 
app.use(morgan('combined'))

//Connect Database 
// db.connect("ecom-block-v2");
db.connect("ecommerce-blockchain");

app.use(express.static(path.join(__dirname,'public')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"public/build", "index.html"));
});
//routes 
route(app);
app.listen(port, () => {
  console.log(`Ecommerce Blockchain app listening on port ${port}`)
})