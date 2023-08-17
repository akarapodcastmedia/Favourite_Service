const schema = require("mongoose");
const uuid = require("uuid");

// sign up schema 
const SignUpSchema = new schema.Schema({
     _id : {
         type : String ,
         default : function getUUID(){
             return uuid.v1()
         }
     },
     username : {
          type : String,
           required : true
     },
     email : {
         type : String ,
         required : true ,
         unique : true
     },
     password : {
         type : String ,
         required : true
     },
     confirm : {
         type : String,
         required : true   
     },
     role: {
         type : [String],
         enum : ["user","podcaster","admin","super_admin"],
         default : ["user"]
     },
     personal_secret : {
         type : String ,
         default : null
     },
     accessToken : {
         type : String,
         default : null
     },
     refreshToken: {
         type : String,
         default : null
     }
 },{timestamps : true,versionKey:false});
 
// create the podcast schema 
const FavoriteSchema = new schema.Schema({
     _id : {
          type : String,
          default : function getUUID(){return uuid.v1()}
      },
     podcastId : {
          type : String,
          required : true
     },categoryId:{
          type : String,
          required: true
     }, 
     userId : {
          type : String,
          required : true
     }
},{
     timestamps : true,
     versionKey:false
});

 // create the podcast schema 
 const podcast = new schema.Schema({
     _id : {
         type : String ,
         default : uuid.v1
     },
     podcastCategoryName:{
         type : String,
         required: true
     },
     podcastCategoryId:{
         type : String,
         default : null
     },
     owner : {
         type : String,
         default : "Anonymous"
     }
     ,
     podcastTitle : {
         type : String,
         required : true 
     },
     podcasterId : {
         type : String,
         required: true
     },
     audioName : {
         type : String,
         required : true
     },
     imageName : {
         type : String,
         required : true
     },
     podcastUrl : {
         type : String, 
         defautl : null
     },
     imageUrl: {
         type : String,
         default : null
     },
     podcastDescription : {
         type : String , 
         default : "Akara podcast."
     },
     ban: {
         type :String,
         default : "Disbanned" 
     }
     ,
     viewed: {
         type : Number,
         default : 0
     },
     favourite : {
        type : Boolean,
        default : false
    }
     
 },{
     timestamps : true,
     versionKey:false
 });


const favoriteModel = schema.model("favoriteModel",FavoriteSchema);
const signupModel = schema.model("signupmodels",SignUpSchema);
const podcastModel = schema.model("Podcasts",podcast);
// create a model from this schema 
module.exports = {
    favoriteModel,
    signupModel,
    podcastModel
}