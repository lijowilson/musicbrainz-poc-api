const express = require("express");
const morgan = require("morgan");

const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//registering routes
app.use("/music-app/search/" , searchRoutes);

//Error handling
app.use((err,req,res,next) => {

    console.log('error '+err)
    res.status(500).json({message:'some error occured'});
});

module.exports = app;