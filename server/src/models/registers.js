const dotenv = require("dotenv").config({ path: './../../.env' }).parsed
const mongoose = require('mongoose')
const bycryptjs = require("bcrypt")
const jwt = require("jsonwebtoken")


const fleetManager = new mongoose.Schema({
        name: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true,
                unique: true
        },
        password: {
                type: String,
                required: true
        },
        trucks:{
                type:String,
                unique: true,            
        },
        tokens: [{
                token: {
                        type: String,
                        required: true,
                }
        }]
})

// Generating JWT auth 
fleetManager.methods.generateAuthToken = async function () {
        try {
                const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
                this.tokens = this.tokens.concat({ token: token })
                await this.save()
                return token
        } catch (error) {
                res.send("The error :" + error)
                console.log(Error)
        }
}

// Hashing Password
fleetManager.pre("save", async function (next) {
        if (this.isModified("password")) {
                this.password = await bycryptjs.hash(this.password, 10)
                next()
        }
})


const Register = new mongoose.model("Register", fleetManager)
module.exports = Register