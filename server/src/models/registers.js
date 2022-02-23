const mongoose = require('mongoose')
const bycryptjs = require("bcrypt")

const fleetManager = new mongoose.Schema({
        name:{
                type:String,
                required:true
        },
        email:{
                type:String,
                required:true, 
                unique:true
        },
        password:{
                type:String, 
                required:true
        },
})

fleetManager.pre("save",async function(next){
        if(this.isModified("password")){
                this.password = await bycryptjs.hash(this.password,10)
                next()
        }
})


const Register = new mongoose.model("Register",fleetManager)
module.exports = Register