const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    firstName: { 
        type: String, 
        required:[true , 'Please enter your firstName!' ]
    }, 
    lastName:{
        type: String,
        required:[true , 'Please enter your lastName!' ]
    },
    streetAddress:{
        type:String,
        required:[true , 'Please enter your street Address!' ]
    },
    apartmentAddress:{
        type:String,
        required:[true , 'Please enter your apartment Address!' ]
    }, 
    city:{
        type:String,
        required:[true , 'Please enter your city!' ]
    },
    country:{
        type:String,
        required:[true , 'Please enter your country!' ]
    },
    sdt:{
        type:String,
        required:[true , 'Please enter your phone!' ]
    },
    email:{
        type:String,
        required:[true , 'Please enter your email!' ]
    },
    notes:{
        type:String,
        max:255,
        required:[true , 'Please enter your notes!' ]
    },
    method:{
        type:Number,
        default:1
    },
    totalVND:{
        type:Number,
        required:[true , 'Please enter your total VND!' ]
    },
    totalETH:{
        type:Number,
        required:[true , 'Please enter your total ETH!' ]
    },
},{
    timestamps:true
});

module.exports =  mongoose.model('order', orderSchema);