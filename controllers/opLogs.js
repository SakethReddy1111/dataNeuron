const Helper = new Object()
const OpLogs = require("../models/opLogs")

Helper.getTodoLogs = async(req,res)=>{
    try{

        let data = await OpLogs.find({collection: 'todos'}, {method:1, count:1})

        res.status(500).json({ success:true, response:data});

    }catch(er){
        console.log(er)
        res.status(500).json({ success:false, error: 'Internal Server Error' });
    }
}

module.exports = Helper
