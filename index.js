const express = require('express')
const app = express()
const mongoDB = require("./db");
const cors = require('cors');
mongoDB();

app.get("/", (req, res) => {
    res.send({ status: ok });
})

app.use(cors());



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());


app.use('/api', require('./Routes/CreatUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})