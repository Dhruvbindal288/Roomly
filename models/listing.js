const mongoose=require("mongoose");

const listingSchema=new mongoose.Schema({
title:String,
description:String,
imageurl:{
    default:"Image Not Available",
    type:String,
    set:(v)=>v===""?"Image Not Available":v,
},
price:Number,
location:String,
country:String

})

const Listing=new mongoose.model("Listing",listingSchema);

module.exports=Listing;