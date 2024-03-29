const express = require('express');
const Router = express.Router();
const Order = require('../models/Orders');

const adminEmail = "admin@gmail.com";

Router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    console.log("1231242343242354", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    let adminId = await Order.findOne({'email':adminEmail})
    console.log(eId)
    let addSuccess = false;
    if (eId === null) {
        try {
            console.log(data)
            console.log("1231242343242354", req.body.email)
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(async() => {
                await Order.create({
                    email:adminEmail,
                    order_data: [data],
                })
                .then(()=>{
                    return res.json({success:true});
                })
                .catch((err)=>{
                    console.log("Error: ", err);
                })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(async () => {
                    await Order.findOneAndUpdate({
                        email: adminEmail
                    },
                    {
                        $push: {order_data: data}
                    }
                    )
                    .then(()=>{
                        return res.json({success:true});
                    })
                    .catch((err)=>{
                        console.log("Error: ", err);
                    })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    
})

Router.post('/myOrders', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({ orderData: eId })
    } catch (error) {
        res.send("Error", error.message)
    }
})

module.exports = Router;