const axios =require('axios')
const musicBrainzSearchService = require('../../src/services/musicBrainzSearchService');
jest.mock('axios');

describe('musicbrainz service - get count of artist', () => {
    it('should return a artistid instead of count if count is 1 ', async() => {
        const mockData = { 
            "count": 1,
            "artists": [
                {
                    "id": "14b4bda4-26e5-4f22-9c27-dfee04de0a2a",
                }
            ]
        
        }

        axios.get.mockResolvedValue({data:mockData});

        const result = await musicBrainzSearchService.getCountByArtist('Jake99');
        expect(result).toEqual('14b4bda4-26e5-4f22-9c27-dfee04de0a2a');

    })

    it('should return the count instead of artistid  when count > 1', async() => {
        const mockData = { 
            "count": 2,
            "artists": [
                {
                    "id": "14b4bda4-26e5-4f22-9c27-dfee04de0a2a",
                },
                {
                    "id": "14b4bda4-26e5-4f22-9c27-dfee04de0a2b",
                }
            ]
        
        }

        axios.get.mockResolvedValue({data:mockData});

        const result = await musicBrainzSearchService.getCountByArtist('jakes');
        expect(result).toEqual(2);

    })
})


describe('musicbrainz service - get collection by artist id', () => {
    it('should return all the releases based on artist id  ', async() => {
        const mockData = { 
            "type": "Person",
            "type-id": "b6e035f4-3ce9-331c-97df-83397230b0df",
            "releases": [
                {
                    "title": "infinite",
                    "id":"12323-asdfasdf-asdfsadf"
                },
                {
                    "title": "test title",
                    "id":"12323-asdfasdf-343sefser"
                }
            ]
        
        }

        const expectedOutput = {
            "releases": [
                {
                    "title": "infinite",
                    "id":"12323-asdfasdf-asdfsadf"
                },
                {
                    "title": "test title",
                    "id":"12323-asdfasdf-343sefser"
                }
            ]
        }

        axios.get.mockResolvedValue({data:mockData});

        const result = await musicBrainzSearchService.getAllCollectionsByArtist('e0bba708-bdd3-478d-84ea-c706413bedab');
        expect(result).toEqual(expectedOutput);

    
    })

    it('should return empty data if no releases returned by api  ', async() => {
        const mockData = { 
            "type": "Person",
            "type-id": "b6e035f4-3ce9-331c-97df-83397230b0df"
        
        }

        const expectedOutput = {}

        axios.get.mockResolvedValue({data:mockData});

        const result = await musicBrainzSearchService.getAllCollectionsByArtist('e0bba708-bdd3-478d-84ea-c706413bedab');
        expect(result).toEqual(expectedOutput);

    
    })
})


describe('musicbrainz service - get all artistnames and id', () => {
    it('should return all the artist names and id from the response  ', async() => {
        const mockData = { 
            "created": "2025-02-10T23:11:33.460Z",
            "count": 8,
            "offset": 0,
            "artists": [
                {
                "id": "b95ce3ff-3d05-4e87-9e01-c97b66af13d4",
                "type": "Person",
                "type-id": "b6e035f4-3ce9-331c-97df-83397230b0df",
                "score": 100,
                "gender-id": "36d3d30a-839d-3eda-8cb3-29be4384e4a9",
                "name": "Eminem"
                },
                {
                "id": "3d357e4a-c240-444a-bae4-c9e85a288b5d",
                "type": "Person",
                "type-id": "b6e035f4-3ce9-331c-97df-83397230b0df",
                "score": 46,
                "gender-id": "93452b5a-a947-30c8-934f-6a4056b151c2",
                "name": "Hailie Jade",
                "sort-name": "Jade, Hailie"
                }
            ]
        
        }

        const expectedOutput = {
            "artists": [
                {
                    "id": "b95ce3ff-3d05-4e87-9e01-c97b66af13d4",
                    "name":"Eminem"
                },
                {
                    "id": "3d357e4a-c240-444a-bae4-c9e85a288b5d",
                    "name":"Hailie Jade"
                }
            ]
        }

        axios.get.mockResolvedValue({data:mockData});

        const result = await musicBrainzSearchService.getAllArtistsName('eminem');
        expect(result).toEqual(expectedOutput);

    
    })

})