const Helper = new Object()
const Todo = require("../models/todo")

Helper.getTodo = async (req, res)=>{
    try{
        let {page, limit} = req.query

        page = Number(page)
        limit = Number(limit)
        
        page = page?page:0
        limit = limit?limit:10

        let data = await Todo.aggregate([
            {
                $project:{
                    text:1
                }
            },
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [{ $skip: page * limit }, { $limit: limit }],
                },
            },
        ])

        if(data.length==1){
            data = data[0]
        }

        res.json({ success:true, data});
    }catch(er){
        console.log(er)
        res.status(500).json({ success:false, error: 'Internal Server Error' });

    }
}

Helper.addTodo = async (req, res)=>{
    try{
        console.log("tis is called")
        let {text} = req.body
        console.log({text}, req.body)

        let data = await Todo.create({text})

        res.json({ success:true, response:'added successfully'});
    }catch(er){
        console.log(er)
        res.status(500).json({ success:false, error: 'Internal Server Error' });

    }
}

Helper.updateTodo = async (req, res)=>{
    try{
        let {_id, text} = req.body

        let data = await Todo.findByIdAndUpdate(_id,{$set:{text}})

        res.json({ success:true, response:'updated successfully'});
    }catch(er){
        console.log(er)
        res.status(500).json({ success:false, error: 'Internal Server Error' });

    }
}

Helper.deleteTodo = async (req, res)=>{
    try{
        let {_id} = req.query
        let data = await Todo.findByIdAndDelete(_id)
        console.log("in this")

        res.json({ success:true, response:'deleted successfully'});
    }catch(er){
        console.log(er)
        res.status(500).json({ success:false, error: 'Internal Server Error' });

    }
}

module.exports = Helper