const dotenv = require("dotenv").config({ path: './../../.env' }).parsed
const mongoose = require('mongoose')

const registeredTrucks = new mongoose.Schema({
        truckNum: {
                type: String,
                required: true
        },
        apiKey: {
                type: String,
                required: true
        },
        channelId: {
                type: String,
                required: true,
        },
        
})


const Truck = new mongoose.model("Truck", registeredTrucks)
module.exports = Truck