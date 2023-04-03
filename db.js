require('dotenv').config();

const mongoose = require('mongoose');
const password = process.env.PASSWORD;

const mongoURI = 'mongodb+srv://keshavtomar:' + password + '@cluster0.ibzyjol.mongodb.net/Foodie?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

const mongoDB = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err) => {
        if (err) {
            console.log("Database connection failed with following error");
            console.log(err);
        }
        else {
            console.log("Database connection successfull");

            const fetched_data = await mongoose.connection.db.collection("sample");
            fetched_data.find({}).toArray(async function (err, data) {
                if (err) console.log(err);
                else {

                    /*after the sample data is fetched uske baad m category data fetch kr rha hu,
                    however, category data sample data k sath hi differently bhi fetch ho skta h 
                    no doubt about it*/
                    const category = await mongoose.connection.db.collection("category");
                    category.find({}).toArray(async (err, catData) => {
                        // I can also write if-else instead of try catch
                        try {
                            global.food_items = data;
                            global.food_category = catData;
                            // In the above line I have made a global variable named as food_items, and passes the resulte
                            // of fetched data in that global variable, I have made it global so that I can use it elsewhere,
                            // no need to declare var or let or const that's how the syntax of global variable is

                        } catch (error) {
                            console.log(error);
                        }
                    })
                }
            });
        }
    });
}

module.exports = mongoDB;