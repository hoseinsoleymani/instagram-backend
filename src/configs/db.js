const mongoose = require("mongoose");

const URI = "mongodb+srv://hoseinsoleymani:hosein8423@cluster0.zkyn6mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(URI);
    console.log("DB Connected Successfully ✅");
  } catch (e) {
    console.log(`Authentication to database failed ❗`);
    process.exit(1);
  }
};

module.exports = connectDB;
