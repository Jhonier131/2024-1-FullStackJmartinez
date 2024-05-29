const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://jhonier:13052002@restaurant.hluhpeu.mongodb.net/restaurant?retryWrites=true&w=majority&appName=restaurant' // Customer change url to your db you created in atlas
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection('foodCategory');
                callback(err, data);

            });
    })
};

// const DB_URI = `mongodb+srv://jhonier:13052002@restaurant.hluhpeu.mongodb.net/restaurant?retryWrites=true&w=majority&appName=restaurant`;

// const dbInit = async () => {
//     mongoose.set("strictQuery", false);
//     await mongoose.connect(`${DB_URI}`);
//     console.log("Init DB");
// };

// module.exports = {
//     dbInit
// }