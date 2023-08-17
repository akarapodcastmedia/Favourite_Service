const {signupModel,favoriteModel, podcastModel} = require('../db/schema');
// ==============================
// Add favourite
//===============================
let newViewed = 0;
async function addFavourite(email,podcast_id){
    // use
    const user = await signupModel.findOne({email : email});
    if(user){
        // find the podcast 
        const podcast = await podcastModel.findOne({_id : podcast_id});
        const isExist = await favoriteModel.findOne({podcastId : podcast_id ,userId : user._id});
        if(podcast){
            if(isExist){
                return "already add to favourite";
            }else{
                const adder = new favoriteModel({
                    podcastId : podcast._id,
                    categoryId : podcast.podcastCategoryId,
                    userId : user._id
                });
                // save the adder
                await adder.save();
                // add one view to that podcast 
                newViewed = podcast.viewed + 1;
                console.log(newViewed);
                await podcastModel.updateOne({_id : podcast._id},{viewed :newViewed});
                newViewed=0;
                // return the user
                return "add favourite success";
            }     
        }else{
            return "require podcast id";
        }
    }else{
        return "No data";
    }
}

//===============================
// unFavourite 
//===============================
async function unFavourite(email , podcast_id){
    // 
    const user = await signupModel.findOne({email : email});
    if(user){
        // find the podcast 
        const podcast = await podcastModel.findOne({_id : podcast_id});
        if(podcast){
            const deleter = await favoriteModel.deleteOne({podcastId : podcast._id});
            // return the user
            return "unfavourite success";
        }else{
            return "No favourite podcast";
        }
    }else{
        return "No data";
    }
}
//===============================
// get all favourite 
//===============================
async function getAllFavourite(){
    // to get dall data from the database
    const data = await favoriteModel.find({});
    return data;
}
//===============================
// get all faroute by user
//===============================
let podcast_id =[];
async function getFavouriteByUser(email){
    // find the userid ;
    podcast_id =[];
    const user = await signupModel.findOne({email : email});
    if(user){
        // get all the favourite by the user
        const geter = await favoriteModel.find({userId : user._id}).select("podcastId");
        //console.log(podcast_id);
        for(let id of geter){
            podcast_id.push(id.podcastId);
        };
        const data = await podcastModel.find({ _id : {$in : podcast_id}});
        return data;
    }else{
        return "No data";
    }
}
//================================
// delete all favourite 
//================================
async function deleteAllFavourite(){
    // delete all the favorite by admin
    const deleter = await favoriteModel.deleteMany({});
    return "delete success";
}

module.exports = {
    addFavourite,
    unFavourite,
    getAllFavourite,
    getFavouriteByUser,
    deleteAllFavourite
}