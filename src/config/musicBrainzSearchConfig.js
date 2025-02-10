require('dotenv').config();


getAPIURLForArtistSearch = async (artistName) => {

    const BASE_API_URL = process.env.MUSIC_BRAINZ_BASE_URL;
    const limit=process.env.MUSIC_BRAINZ_RETURN_LIMIT;
    return BASE_API_URL.concat("artist/?query=")
    .concat(encodeURIComponent(artistName))
    .concat("&fmt=json&limit=").concat(limit);

}

getConfigForMusicBrainz = async () => {

   return {
        headers: {
            'Content-Type':'application/json',
            'User-Agent': 'My-Music-App/1.0.0'
        }

   }

   
}

getAPIURLForReleasesByArtist= async (artistId) => {

    const BASE_API_URL = process.env.MUSIC_BRAINZ_BASE_URL;
    return BASE_API_URL.concat("artist/").concat(artistId)
    .concat("?fmt=json&inc=releases");

}

module.exports = {
    getAPIURLForArtistSearch,
    getConfigForMusicBrainz,
    getAPIURLForReleasesByArtist
}