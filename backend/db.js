const mongoose = require('mongoose')

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB Connected');
        })
        .catch((err) => {
            console.log('Error connecting to MongoDB:', err);
        });
}
module.exports = connectToMongo;
