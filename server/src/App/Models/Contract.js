const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContractSchema = new Schema({
    name: {
        type: String,
        max:255,
        unique: true,
        required:[true , `Please enter supplier's name!`]
    },
    email:{
        type: String,
        max:255,
        unique: true,
        required:[true , `Please enter supplier's email!`]
    },
    wallet:{
        type:String,
        required:[true , `Please enter supplier's wallet!`]
    },
    address:{
        type:String,
        required:[true, `Please enter supplier's address!`]
    },

},{
    timestamps:true
});

module.exports =  mongoose.model('contract', ContractSchema);