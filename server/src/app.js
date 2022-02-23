const express = require("express")
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
require('./db/conn')
const Register = require("./models/registers")
const hbs = require("hbs")
const bycryptjs = require("bcrypt")
const static_path = path.join(__dirname,"../public")
const templates_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", templates_path)
hbs.registerPartials(partials_path)

// Home page
app.get('/', (req,res)=>{
        res.render("index")
})

// Register Get Post 
app.get('/register',(req,res)=>{
        res.render("register")
})
app.post('/register',async (req,res)=>{
        try {
                const password = req.body.password
                const password1 = req.body.password1

                const alreadyExists = await Register.findOne({email:req.body.email})
                if(alreadyExists){
                        return res.status(404).send("This user already exists please try to login")
                }

                if(password == password1){
                        const registerManager = new Register({
                                name: req.body.name,
                                email: req.body.email,
                                password: password
                        })         
                        const registered = await registerManager.save()
                        res.status(201).render('index')
                }
                else{
                        res.status(404).send("Password did not match")
                }
        } catch (error) {
                res.status(400).send(error)
        }
})

// Login get post
app.get("/login",(req,res)=>{
        res.render("login")
})
app.post("/login",async (req,res)=>{
        try{
                const email = req.body.email
                const password = req.body.password
                const userEmail = await Register.findOne({email: email})
                const isMatch = bycryptjs.compare(password, userEmail.password)
                if(isMatch){
                        res.status(201).render("home")
                }
                else{
                        res.send("Invalid Details")
                }

        }catch(error){
                res.send("Invalid Details")
        }
})
app.listen(port, ()=>{
        console.log(`Server at port: ${port}`)
})

