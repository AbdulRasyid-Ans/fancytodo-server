const {User} = require("../models/")
const jwt = require("../helpers/jwt")
const bcrypt = require("bcryptjs")
const {OAuth2Client} = require('google-auth-library');

class UserController {

    static async register(req,res, next){
        try {
            const obj = {
                email: req.body.email,
                password: req.body.password
            }
            const data = await User.create(obj,{returning:true})
            res.status(201).json({id:data.id,email:data.email})
        } catch (err) {
            next(err)
        }
    }

    static async login(req,res,next){
        try {
            const {email,password} = req.body
            const data = await User.findOne({where : {email}})
            if(data){
                const pass = await bcrypt.compare(password,data.password)
                if(pass){
                    let accessToken = jwt.signToken({id:data.id,email:data.email})
                    console.log(req.headers);
                    res.status(200).json({accessToken,id:data.id,email:data.email})
                }else{
                    throw {name:'Invalid email or password'}    
                }
            }else{
                throw {name:'Invalid email or password'}
            }
        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req,res,next){
        const {google_token} = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
            try {
                const ticket = await client.verifyIdToken({
                    idToken: google_token,
                    audience: process.env.GOOGLE_CLIENT,
                });
                const payload = ticket.getPayload();
                const email = payload.email
                const available = await User.findOne({where:{email}})
                if(available){
                    let accessToken = jwt.signToken({id:available.id,email:available.email})
                    res.status(200).json({accessToken,id:available.id,email:available.email})
                }else{
                    const newUser = await User.create({
                        email,
                        password : process.env.DEFAULT_PASSWORD
                    })
                    let accessToken = jwt.signToken({id:newUser.id,email:newUser.email})
                    res.status(200).json({accessToken,id:newUser.id,email:newUser.email})
                }
            } catch (err) {
                next(err);
        } 
    }
}
module.exports=UserController