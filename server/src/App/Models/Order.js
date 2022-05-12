const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    name: { 
        type: String, 
        required:[true , 'Please enter your Name!' ]
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
    phone:{
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
    status:{
        type:Number,
        default: 0
    },
    listItemOrder:[{ type: Schema.Types.ObjectId, ref: 'order_item' }],
},{
    timestamps:true
});

module.exports =  mongoose.model('order', orderSchema);