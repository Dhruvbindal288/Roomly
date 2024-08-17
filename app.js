const express=require("express");
const app=express();
const mongoose=require("mongoose");
const port=8080;
const Mongo_url="mongodb://127.0.0.1:27017/roomly";

main().then(()=>{console.log('Connection Successful to DB')});
async function main() {
    await mongoose.connect(Mongo_url);
}
//Setting view Engine
app.set("view",path.join(__dirname,"views"));
app.set("view engine","ejs");


//Strating Server
app.listen(port,()=>{
    console.log("Server Started Well")
})
