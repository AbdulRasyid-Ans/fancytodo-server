const {User,Todo} = require("../models")
const jwt = require("../helpers/jwt")

class Auth {
    static async authorAdd(req,res,next){
        try {
            if(!req.userLogin){
                console.log("Author Failed Dont Have Access");
                throw {name: "You dont have access"}
            }
            else{
                console.log("Author Success");
                next()
            }
        } catch (error) {
            console.log("Author Failed");
            next(error) 
        }
    }
    static async authorUpdate(req,res,next){
        try {
            const {id} = req.params    
            const userLogin = req.userLogin.id
            const data = await Todo.findByPk(id)
            if(!data){
                throw {name: "Data Not Found"}
            }
            else if(userLogin !== data.UserId){
                throw {name: "You dont have access"}
            }
            else{
                next()
            }
        } catch (err) {
            next(err)
        }
    }

    static async authentication(req, res, next){
        try {
            const {accesstoken} = req.headers
            console.log(req.headers);
            if(!accesstoken){
                throw {name: "You dont have access"}
            }else{
                const decode = jwt.verifyToken(accesstoken)
                const user = await User.findByPk(decode.id)
                if(!user){
                    console.log("Auth Fail dont have access");
                    throw {name: "You dont have access"}
                }else{
                    console.log("Auth Success");
                    req.userLogin = decode
                    next()
                }
                
            }
            
        } catch (err) {
            console.log("Auth Fail");
            next(err)
        }
    }
}


module.exports = Auth