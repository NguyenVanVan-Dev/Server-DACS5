const express = require('express');
const app = express();
const db = require('./src/App/Config/index');
const route = require('./src/Routes');
const cors = require('cors')
const morgan = require('morgan');
const path = require("path")
require('dotenv').config();
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

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname,"public/build", "index.html"));
// });
//routes 
route(app);

const PORT = process.env.PORT || 2105;
app.listen(PORT, () => {
    console.log(`Ecommerce Blockchain app is running on port ${ PORT }`);
});