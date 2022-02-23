const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/fleetmanagers',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
}).then(()=>{
        console.log(`Connection successfull`)
}).catch(error=>{
        console.log(`No Connection to the database!!${error}`)
})