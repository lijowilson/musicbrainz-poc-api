const express = require("express");

const router = express.Router();
const searchWithApiController = require("../controllers/searchWithAPIController");

//controller invoked via direct url 
router.get('/v1/artist/:artistName',
searchWithApiController.getCollectionByArtist
);

router.get('/v1/artist/:artistId/releases',
searchWithApiController.getCollectionByArtistId
);


//TODO:controller invoked via third party library
//router.get("/v2/artist/:artistName", searchWithLibController);

module.exports = router;