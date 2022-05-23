const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    name: { 
        type: String, 
        required:[true , 'Please enter your Name!' ]
    }, 
    email:{
        type:String,
        required:[true , 'Please enter your email!' ]
    },
    wallet:{
        type:String,
        required:[true , 'Please enter your wallet!' ]
    },
},{
    timestamps:true
});

module.exports =  mongoose.model('employee', employeeSchema);