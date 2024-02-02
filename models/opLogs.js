const mongoose = require("mongoose");

const opLogsSchema = new mongoose.Schema({
    collection: {type:String, required:true},
    method:{type:String, required:true},
    count:{type:Number, default:0, required:true},
}, {
    timestamps:true,
    versionKey:false
})

const OpLogs =  mongoose.model('oplogs', opLogsSchema);
module.exports = OpLogs