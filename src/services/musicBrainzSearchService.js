const axios = require("axios");
const musicBrainsSearchConfig =require('../config/musicBrainzSearchConfig');

getCountByArtist =  async (artistName) => {

    console.log('start with getcountbyartist method')
    const ARTIST_SEARCH_URL =   await musicBrainsSearchConfig.getAPIURLForArtistSearch(artistName);
    console.log('start with musicbrains')
    const musicBrainsConfig =   await musicBrainsSearchConfig.getConfigForMusicBrainz();

    console.log('artist search url'+ARTIST_SEARCH_URL+' and musicconfig-'+musicBrainsConfig)

         const responseData = await axios.get(ARTIST_SEARCH_URL,musicBrainsConfig).then(response => {
            console.log('response data count '+response.data.count);
            if(response.data.count == 1){
                 return response.data.artists[0].id;
            }else{
                console.log('returning response data count before return statuement '+response.data.count)
                 return response.data.count;
            }
        })
        
        return responseData;
   
}

getAllCollectionsByArtist = async(artistId) => {

    const RELEASE_SEARCH_URL = await musicBrainsSearchConfig.getAPIURLForReleasesByArtist(artistId);
    const musicBrainsConfig =  await musicBrainsSearchConfig.getConfigForMusicBrainz(); 

        console.log('artist by id search url '+RELEASE_SEARCH_URL);

        const responseData = await axios.get(RELEASE_SEARCH_URL,musicBrainsConfig).then(response => {
            
        return {
            releases : response.data.releases
            }

        });
        
        return responseData;

}

getAllArtistsName = async(artistName) => {

    const ARTIST_SEARCH_URL = await  musicBrainsSearchConfig.getAPIURLForArtistSearch(artistName);
    const musicBrainsConfig =  await musicBrainsSearchConfig.getConfigForMusicBrainz();


        const responseData= await axios.get(ARTIST_SEARCH_URL,musicBrainsConfig).then(response => {
            
            const responseData = response.data;

            const artistCollection = responseData.artists;

            const extractedArtists = artistCollection.map(artist => ({
                id: artist.id,
                name: artist.name
            }));

            const updatedResponse = {
                artists: extractedArtists
            };

            return updatedResponse;

        })

        return responseData;

}


module.exports= {

    getCountByArtist,
    getAllCollectionsByArtist,
    getAllArtistsName
};