const OpLogs = require("../models/opLogs")

module.exports.updateOpLogs = async(response, req)=>{
    try{

        if(!response.success) return

        console.log(req.method, req.method=="DELETE" , req.originalUrl, req.originalUrl=="/todo/deleteTodo")

        if(req.method=="POST" && req.originalUrl=="/todo/addTodo"){

           await OpLogs.findOneAndUpdate({
                collection: 'todos',
                method:"added",
            }, {$inc:{count:1}}, {upsert:true})
        }else if(req.method=="PATCH" && req.originalUrl=="/todo/updateTodo"){

            await OpLogs.findOneAndUpdate({
                 collection: 'todos',
                 method:"updated",
             }, {$inc:{count:1}}, {upsert:true})
        }else if(req.method=="DELETE" && req.originalUrl.includes("/todo/deleteTodo?")){

            await OpLogs.findOneAndUpdate({
                 collection: 'todos',
                 method:"deleted",
             }, {$inc:{count:1}}, {upsert:true})
        }

        return
    }catch(er){
        console.log(er)
    }
}