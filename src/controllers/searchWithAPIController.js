const musicBrainzSearchService  = require("../services/musicBrainzSearchService");
const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL:3600});


getCollectionByArtist = async (request, response ) => {

    
    //assuming all params are valid, perform the business operation
    try {

        const artistName=request.params.artistName;
        console.log(`artist name : ${artistName}`);
        const cacheKey=`Artist:${artistName}`;

        //validate parameeters
        //const cachedResponse = await redisClientService.getDataFromCache(artistName);
        const cacheData = cache.get(cacheKey);
        if(cacheData){
            console.log(`serving from cache for key: ${cacheKey}`);
            return response.json(cacheData);
        }
      
        //get the number of artists
        const numberOfArtists =  await musicBrainzSearchService.getCountByArtist(artistName);
        console.log('number of artists'+numberOfArtists);
        if(isNaN(numberOfArtists)){
            //this means there is only one artist returned, so return the releses for that artis by id
            const apiResponse = await musicBrainzSearchService.getAllCollectionsByArtist(numberOfArtists);
           
            //setting in cache
            cache.set(cacheKey,apiResponse);
            response.json(apiResponse);

        }else if (numberOfArtists<=0){
            response.status(404).json({
                message: "No Artist Found"
            })
        }else {
            const apiResponse = await musicBrainzSearchService.getAllArtistsName(artistName);
             //setting in cache
             cache.set(cacheKey,apiResponse);
            response.json(apiResponse);
        }
        

        


    }catch(error){
        response.status(500).json({message:error.message})
    }
    

};




getCollectionByArtistId = async (request, response ) => {

    
    //assuming all params are valid, perform the business operation
    try {

        const artistId=request.params.artistId;
        console.log('artist id'+artistId);

        //validate parameeters

        //get the number of artists
        const apiResponse =  await musicBrainzSearchService.getAllCollectionsByArtist(artistId);
        response.json(apiResponse);

    }catch(error){
        if(error.response.status == 400){
            console.log('400 status');
            return response.status(404).json({message:"invalid artistId"});
        }else{
            return response.status(500).json({message:error.message})

        }
    }    


};

module.exports = {
    getCollectionByArtist,
    getCollectionByArtistId
};