const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: { 
        type: String, 
        required:[true , 'Please enter your name!' ]
    }, 
    desc:{
        type: String,
        max:255,
        required:[true , 'Please enter your desciption!' ]
    },
    keyword:{
        type:String,
        required:[true , 'Please enter your keyword!' ]
    },
    display:{
        type:Number,
        default: 0,
    },
    slug:{
        type:String,
        required:[true , 'Please enter your slug!' ]
    },
    price:{
        type:Number,
        required:[true,'Please enter price for Product!']
    },
    qty:{
        type:Number,
        required:[true,'Please enter quantity for Product!']
    },
    category_id:{
        type: String,
        ref: 'category',
        default: 1,
    },
    image:{
        type:String,
        required:[true,'Please add image for Product!']
    },
    type_display:{
        type:Number,
        default:1
    },
    sale_of:{
        type:Number,
        default: 0
    },
    wallet:{
        type:String,
        required:[true,'Please select supplier for Product!']
    }
},{
    timestamps:true
});

module.exports =  mongoose.model('product', productSchema);