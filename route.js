const express = require("express");
const router  = express.Router();
const db = require("./db/mongoConfig");
const {addFavourite,unFavourite,getFavouriteByUser,getAllFavourite,deleteAllFavourite}  = require('./util/favouriteLogic');
db();

//=======================================
// insert podcast into favorite database
//=======================================
router.post('/addfavorite',async(req,res)=>{
   const data = await addFavourite(req.email,req.body.podcast_id);
   return res.json({
        error : false,
        message : data
   })
})

//=====================================
// get all podcasts from favorite by a particular user
//======================================
router.get('/getfavourite/user',async(req,res)=>{
    const data = await getFavouriteByUser(req.email);
    return res.json({
        error : false,
        message : data
    });
})
// ==================================================
// unfavourte or delete their favourite podcast
//===================================================
router.post('/unfavourite',async(req,res)=>{
    const data = await unFavourite(req.email,req.body.podcast_id);
    return res.json({
        error : false,
        message : data
    })
})
// ==================================================
//  get all favourite 
//===================================================
router.post('/delete/all',async (req,res)=>{
    const data = await deleteAllFavourite();
    return res.json({
        error : true,
        message : data
    })
})

//===================================================
// get all favourite 
//===================================================
router.get('/get/all',async(req,res)=>{
    const data = await getAllFavourite();
    return res.json({
        error : true,
        message : data
    })
})
module.exports= router;