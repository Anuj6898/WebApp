const dotenv = require("dotenv").config({ path: './.env' }).parsed
const express = require("express")
const app = express()
const fetch = require( 'cross-fetch')
const path = require('path')
const port = process.env.PORT

require('./db/conn')
const Register = require("./models/registers")
const Truck = require("./models/trucks")
const hbs = require("hbs")
const colors = require("colors")
const cookieParser = require("cookie-parser")
const auth = require("../src/middleware/auth")
const bycryptjs = require("bcrypt")
const jwt = require('jsonwebtoken')
const { channel } = require("diagnostics_channel")

const static_path = path.join(__dirname, "../public/css")
const templates_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", templates_path)
hbs.registerPartials(partials_path)

// Home page
app.get('/', (req, res) => {
        res.render("index")
})
app.get('/secret', auth, (req, res) => {
        res.render('secret')
})

// Admin Page
app.get('/admin',auth,(req,res)=>{
        res.render('admin')
})
app.post('/admin',(req,res)=>{
        const mail = req.body.email
        const pass = req.body.password
        if(mail==='admin@admin.in' && pass==='123456'){
                res.render("adminHome")
        }
        else{
                return res.render("admin",{
                        adminInvalid:true
                })
        }

})
app.post('/addTruck',async (req,res)=>{

        const truckNum          = req.body.truckNumber
        const channelId         = req.body.channelId
        const apiKey            = req.body.apiKey
        const truckExists       = await Truck.findOne({ truckNum : truckNum })        
        const channelExists     = await Truck.findOne({ channelId : channelId })
        const apiExists         = await Truck.findOne({ apiKey: apiKey})

        if(truckExists|| channelExists || apiExists){
                return res.render('adminHome',{
                        exists:true
                })
        }
        const registerTruck = new Truck({
                truckNum:       truckNum,
                channelId:      channelId,
                apiKey:         apiKey
        })
        const registeredTruck = await registerTruck.save()

        if(registerTruck){
                return res.render('adminHome',{
                        success:true
                })
        }
        else{
                return res.render('adminHome',{
                        failed:true
                })
        }
})

app.post('/add',async (req,res)=>{
        try{
                const truck = await Truck.findOne({channelId: req.body.channelId})
                res.render('home',{
                        apiKey:         truck.apiKey,
                        channelId:      truck.channelId,
                        truckNum:       truck.truckNum,
                })
        }
        catch(error){
                res.send("error: "+error).status(404)
        }
        // res.send(await Truck.findOne({channelId:req.body.channelId}))
})


app.get('/home',auth,(req,res)=>{
        res.render("home")
})
app.get('/driverhealth',auth,(req,res)=>{
        res.render('driverhealth')
})


// Logout
app.get('/logout', auth, async (req, res) => {
        try {
                req.user.tokens = req.user.tokens.filter((x) => {
                        return x.token != req.token
                })
                res.clearCookie("jwt")
                await req.user.save()
                res.render("afterLogout")

        } catch (error) {
                res.status(500).send(error)
        }
})

// Register Get Post 
app.get('/register', (req, res) => {
        res.render("register")
})
app.post('/register', async (req, res) => {
        try {
                const password = req.body.password
                const password1 = req.body.password1
                const alreadyExists = await Register.findOne({ email: req.body.email })
                if (alreadyExists) {
                        return res.render("register",{
                                userExists:true
                        })
                }
                if(password.length<6){
                        return res.render("register",{
                                passLength:true,
                        })
                }
                if (password == password1) {
                        const registerManager = new Register({
                                name: req.body.name,
                                email: req.body.email,
                                password: password
                        })

                        const token = await registerManager.generateAuthToken()

                        res.cookie("jwt", token, {
                                expires: new Date(Date.now() + 3600000),
                                httpOnly: true,
                        })
                        const registered = await registerManager.save()
                        res.status(201).render('index')
                }
                else {
                        res.render("register",{
                                passwordMatch:true
                                
                        })
                }
        } catch (error) {
                res.status(400).send(error)
        }
})

// Login get post
app.get("/login", (req, res) => {
        res.render("login")
})
app.post("/login", async (req, res) => {
        try {
                const email = req.body.email
                const password = req.body.password
                const userEmail = await Register.findOne({ email: email })
                const isMatch = await bycryptjs.compare(password, userEmail.password)
                const token = await userEmail.generateAuthToken()
                res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 3600000),
                        httpOnly: true,
                })

                if (isMatch) {
                        res.status(201).render("home",{
                                userName: userEmail.name,
                                trucks: userEmail.trucks
                        })
                }
                else {
                        res.render("login",{
                                incorrectCred: true
                        })
                }

        } catch (error) {
                res.render("login",{
                        incorrectCred: true
                })
        }
})

app.post('/addTruck',(req,res)=>{
        res.send(req.body)
})

app.listen(port, () => {
        console.log(`LIVESERVER -->> `.blue + `http://localhost:${port}/`.yellow.bgBlack.italic)
})

