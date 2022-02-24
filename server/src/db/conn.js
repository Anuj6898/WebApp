const colors = require("colors")
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
}).then(() => {
        console.log(`DATABASE -->>`.blue + ` !! MONGODB CONNECTION SUCCESSFUL !!`.green.italic)
}).catch(error => {
        console.log(`DATABASE -->>`.blue + ` !! MONGODB CONNECTION FAILED !! `.red.italic + error)
})