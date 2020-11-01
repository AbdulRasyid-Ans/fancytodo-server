const {Todo} = require("../models")

class TodoController {
    static async list(req,res, next){
        try {
            const data = await Todo.findAll({
                order: [['id', 'DESC']]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async add(req,res,next){
        try {
            const obj = {
                title: req.body.title,
                description: req.body.description,
                status: false,
                due_date: req.body.due_date,
                UserId : req.userLogin.id
            }
            const data = await Todo.create(obj)
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }
    
    static async show(req,res,next){
        try {
            const {id} = req.params
            const data = await Todo.findByPk(id)
            if(!data){
                throw {name:"Data Not Found"}
            }else{
                res.status(200).json(data)
            }
        } catch (err) {
            next(err)
        }
    }

    static async updateAll(req,res,next){
        try {
            const {id} = req.params
            const obj = {
                title: req.body.title,
                description: req.body.description,
                status: false,
                due_date: req.body.due_date,
            }
            const data = await Todo.update(obj,{where:{id},returning:true})
            if(!data[1][0]){
                throw {name:"Data Not Found"}
            }else{
                res.status(200).json(data[1][0])
            }
        } catch (err) {
            next(err)
        }
    }

    static async upStatus(req,res,next){
        try {
            const {id} = req.params
            const obj = {
                status: req.body.status
            }
            const data = await Todo.update(obj,{where:{id},returning:true})
            if(!data[1][0]){
                throw {name:"Data Not Found"}
            }else{
                res.status(200).json(data[1][0])
            }
        } catch (err) {
            next(err)
        }
    }

    static async delete(req,res,next){
        try {
            const {id} = req.params
            const data = await Todo.destroy({where:{id}})
            if(data === 1){
                res.status(200).json({msg: 'todo success to delete'})
            }else{
                throw {name:"Data Not Found"}
            }
        } catch (err) {
            next(err)
        }
    }
}
module.exports = TodoController