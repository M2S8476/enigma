let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
let schema = new mongoose.Schema({
    firstname : {
        type : String,
        require : true
    },
    lastname : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    // gender : {
    //     type : String,
    //     require : true
    // },
    password : {
        type : String,
        require : true
    },
    Cpassword : {
        type : String,
        require : true
    },
}, {timestamps : true, strict : false, autoIndex : true});
schema.plugin(mongoosePaginate);
module.exports = schema;