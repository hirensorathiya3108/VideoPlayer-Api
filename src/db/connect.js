const mongoose = require("mongoose");
const utils = require("../utils/Utils");


const connectDB = (uri) => {
    return mongoose.connect(uri, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }).then(() =>{
        console.log(utils.CONNECTION_SUCCESSFUL);
    }).catch((error) =>{
        console.log(utils.NO_CONNECTION,error.message);
    });
}

module.exports = connectDB;