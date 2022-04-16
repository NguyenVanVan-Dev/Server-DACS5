const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderItemSchema = new Schema({
    orderID: { 
        type: String,
        ref:'order',
        required:[true , 'Please enter your orderID!' ],
    }, 
    productID:{
        type: String,
        ref:'product',
        required:[true , 'Please enter your productID!' ]
    },
    qty:{
        type:String,
        required:[true , 'Please enter your qty!' ]
    },
    price:{
        type:String,
        required:[true , 'Please enter your price!' ]
    }, 
},{
    timestamps:true
});

module.exports =  mongoose.model('order_item', orderItemSchema);