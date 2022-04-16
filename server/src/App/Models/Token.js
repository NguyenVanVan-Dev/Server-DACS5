const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tokenSchema = new Schema({

    refeshToken:{
        type:String,
        required:[true , 'Refesh Token Not Null!' ]
    }
    
},{
    timestamps:true
});

module.exports =  mongoose.model('token', tokenSchema);