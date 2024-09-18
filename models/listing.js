const mongoose=require("mongoose");
const listingSchema=new mongoose.Schema({
title:{
  type:String,
  required: true
},
description:{
  type:String,
  required: true
},
imageurl: {
    filename: String,
    url: {
      type: String,
      default: "Image Not Available",
      set: (v) => (v === "" ? "Image Not Available" : v),
    },
  },
price:{
  type:Number,
  required: true
},
location:{
  type:String,
  required: true
},
country:{
  type:String,
  required: true
},
});

const Listing=new mongoose.model("Listing",listingSchema);

module.exports=Listing;