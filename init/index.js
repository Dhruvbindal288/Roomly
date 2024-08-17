const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initialData = require("./initdata.js");
const Mongo_url = "mongodb://127.0.0.1:27017/roomly";

main()
  .then(() => console.log("Connection Successful to DB"))
  .catch((err) => console.error("Connection failed", err));

async function main() {
  await mongoose.connect(Mongo_url);
}

const data = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initialData.data);
    console.log("Data was Initialized");
    console.log(initialData.data)
  } catch (err) {
    console.error("Failed to initialize data", err);
  }
};

data();
