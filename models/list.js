
const { ref } = require("joi");
const mongoose = require("mongoose");
const review = require("./review.js");
const user = require("./user.js");
const listschema = new mongoose.Schema({
     title:{
          type:String,
          required:true,
     },
     discription:{
          type: String,
     },
     image:{
          url:String,
          filename:String
     },
     feature:{
           type:String,
           require:true
     },
     price:{
          type:Number,
          require:true
     },
     location:{
          type:String,
          require:true
     },
     country:{
            type:String,
            require:true
     },
     reviews:[
          {
               type:mongoose.Schema.Types.ObjectId,
               ref:"review",
          }
     ],
     owner:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"user"
     },
     geometry: {
         type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
         },
        coordinates: {
            type: [Number],
            required: true
          }
    }

});
listschema.post("findOneAndDelete",async(listing)=>{
         if(listing.reviews.length){
               await review.deleteMany({_id : {$in:listing.reviews}})
         }
})

const listing = mongoose.model("listing",listschema);
module.exports = listing;