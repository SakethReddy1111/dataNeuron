const Helper = new Object()
const Todo = require("../models/todo")

Helper.getTodo = async (req, res)=>{
    try{
        let {page, limit} = req.query

        page = Number(page)
        limit = Number(limit)
        
        page = page?page-1:0
        limit = limit?limit:0

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

        res.status(500).json({ success:true, data});
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

        res.status(500).json({ success:true, response:'added successfully'});
    }catch(er){
        console.log(er)
        res.status(500).json({ success:false, error: 'Internal Server Error' });

    }
}

Helper.updateTodo = async (req, res)=>{
    try{
        let {_id, text} = req.body

        let data = await Todo.findByIdAndUpdate(_id,{$set:{text}})

        res.status(500).json({ success:true, response:'updated successfully'});
    }catch(er){
        console.log(er)
        res.status(500).json({ success:false, error: 'Internal Server Error' });

    }
}

Helper.deleteTodo = async (req, res)=>{
    try{
        let {_id, text} = req.body

        let data = await Todo.findByIdAndDelete(_id)

        res.status(500).json({ success:true, response:'deleted successfully'});
    }catch(er){
        console.log(er)
        res.status(500).json({ success:false, error: 'Internal Server Error' });

    }
}

module.exports = Helper