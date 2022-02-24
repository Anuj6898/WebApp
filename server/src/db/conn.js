const mongoose = require("mongoose")
mongoose.connect(process.env.DB_HOST,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
}).then(()=>{
        console.log(`Connection successfull`)
}).catch(error=>{
        console.log(`No Connection to the database!!${error}`)
})