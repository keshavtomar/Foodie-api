const express = require('express');
const Router = express.Router();


// after this we have to hit this /foodData endpoint from the frontend, using fetch function in frontend
Router.post('/foodData', (req, res) => {
    try {
        //because food_items is a globally declared item in db.js so I can access it anywhere
        res.send([global.food_items, global.food_category]);
    } catch (error) {
        console.log(error.message);
        res.send("Server Error");
    }
})

module.exports = Router;