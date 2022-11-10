const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/routes");
const cors=require("cors");

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const url = "mongodb://nitinsayshe:Mantesh007@ac-3s9rokv-shard-00-00.ti1iqt8.mongodb.net:27017,ac-3s9rokv-shard-00-01.ti1iqt8.mongodb.net:27017,ac-3s9rokv-shard-00-02.ti1iqt8.mongodb.net:27017/?ssl=true&replicaSet=atlas-olcurh-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("Mongodb is connected "))
    .catch((err) => console.log(err))

app.use("/", route)

app.listen(process.env.PORT || 8000, function () {
    console.log("Express is running on port " + (process.env.PORT || 8000))
})