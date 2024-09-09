const mongoose = require('mongoose')
const db_url = process.env.MONGO_DB_CONNECTION_URL;

const db_connect = async () => {
  try {
    await mongoose.connect(db_url)
        console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};


module.exports = db_connect