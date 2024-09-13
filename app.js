//REQUIRES
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodoverride=require('method-override');
const ejsMate=require("ejs-mate");
const { title } = require("process");
const wrapAsync=require("./utils/wrapAsync.js");
const { wrap } = require("module");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
//Port Number
const port=8080;
//MONGO URL
const Mongo_url="mongodb://127.0.0.1:27017/roomly";

main().then(()=>{console.log('Connection Successful to DB')});
async function main() {
    await mongoose.connect(Mongo_url);
}
//Setting view Engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);

//TO READ DATA
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"))

app.use(express.static(path.join(__dirname,"/public")))
//Strating Server
app.listen(port,()=>{
    console.log("Server Started Well")
});

//Show ALL Listings
app.get("/listings", wrapAsync(async (req,res)=>{
    const listings=await Listing.find({});
    res.render("./listings/listing.ejs",{listings});
}));

//NEW route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/newlist.ejs");
});
//Posting new list
app.post("/listings",wrapAsync(async(req,res,next)=>{
let{title,description,imageurl,price,country}=req.body;
listingSchema.validate(req.body);
let newList=new Listing({
    title:title,
    description:description,
    imageurl:imageurl,
    price:price,
    country:country
});
await newList.save()
res.redirect("/listings")
}));



//SHOW INDIVIDUAL NAME WITH ALL PROPERTY
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing})
}));


//To update list 
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing})
}));
//to Put update information
app.put("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let{title,description,imageurl,price,country}=req.body;
    await Listing.findByIdAndUpdate(id,{title:title,
        description:description,
        imageurl:imageurl,
        price:price,
        country:country});
    res.redirect("/listings")

}));

//TO Delete listing
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


//Middleware to hande error
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

app.use((err, req, res, next) => {
    let { statuscode = 500, message = "Something went wrong" } = err;
    res.status(statuscode).send(message);
});
     