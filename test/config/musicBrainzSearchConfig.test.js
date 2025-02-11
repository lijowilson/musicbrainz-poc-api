const musicBrainzSearchConfig = require('../../src/config/musicBrainzSearchConfig');


describe('musicbrainz search config - get url for artist search', () => {
    it('should return valid url with artistname included', async() => {
     

        const result = await musicBrainzSearchConfig.getAPIURLForArtistSearch('Jake99');
        const expectedResult='https://musicbrainz.org/ws/2/artist/?query=Jake99&fmt=json&limit=100'
        expect(result).toEqual(expectedResult);

    })
    it('should return valid url with artistname included and url encoded', async() => {
     

        const result = await musicBrainzSearchConfig.getAPIURLForArtistSearch('Jake99 test');
        const expectedResult='https://musicbrainz.org/ws/2/artist/?query=Jake99%20test&fmt=json&limit=100'
        expect(result).toEqual(expectedResult);

    })
});

describe('musicbrainz search config - get url for releases by artist', () => {
    it('should return valid url with artistid included', async() => {
     

        const result = await musicBrainzSearchConfig.getAPIURLForReleasesByArtist('123456');
        const expectedResult='https://musicbrainz.org/ws/2/artist/123456?fmt=json&inc=releases'
        expect(result).toEqual(expectedResult);

    })
    
});