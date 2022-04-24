const mongoose = require('mongoose');
async function connect(dbName){
    try {
        await  mongoose.connect(`mongodb+srv://nguyenvanvan-yone:QyHucO45aM2QJrWQ@cluster0.buxjv.mongodb.net/${dbName}?retryWrites=true&w=majority`);
        console.log(`Connected MongoDB Successfully!  DatabaseName => "${dbName}"`);
    } catch (error) {
        console.log(`Connected MongoDB failue!  DatabaseName => "${dbName}"`);
        console.log(error);
    }

}
module.exports = { connect };