const searchWithAPIController = require('../../src/controllers/searchWithAPIController');
const musicBrainzSearchService = require('../../src/services/musicBrainzSearchService');

jest.mock('../../src/services/musicBrainzSearchService');

describe('search with api controller - getcollection by artist if service returns only more than one artist', () => {

    

    it('return all artist names as the service returns more than 1 artist in search', async() => {

        let req,res;
        req = {params: {artistName:"eminem"}};
        res = {

            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        
        };

        musicBrainzSearchService.getCountByArtist.mockResolvedValue(2);
        musicBrainzSearchService.getAllArtistsName.mockResolvedValue({
            "artists": [
                {
                    "id": "b95ce3ff-3d05-4e87-9e01-c97b66af13d4",
                    "name":"Eminem"
                },
                {
                    "id": "3d357e4a-c240-444a-bae4-c9e85a288b5d",
                    "name":"Hailie Jade"
                }
            ]});
        
        await searchWithAPIController.getCollectionByArtist(req,res);
        expect(res.json).toHaveBeenCalledWith({
            "artists": [
                {
                    "id": "b95ce3ff-3d05-4e87-9e01-c97b66af13d4",
                    "name":"Eminem"
                },
                {
                    "id": "3d357e4a-c240-444a-bae4-c9e85a288b5d",
                    "name":"Hailie Jade"
                }
            ]});

    }); 


    it('return all artist names as the service returns  1 artist in search then response should be collection of releases', async() => {


        let req,res;
        req = {params: {artistName:"eminem123"}};
        res = {

            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        
        };

        musicBrainzSearchService.getCountByArtist.mockResolvedValue("asdfasdf-asdfasdf-asdfasdfsdf");
        musicBrainzSearchService.getAllCollectionsByArtist.mockResolvedValue(
           {
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
        
        );
        
        await searchWithAPIController.getCollectionByArtist(req,res);
        expect(res.json).toHaveBeenCalledWith(

            {
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

        );

    }); 

    it('return 404 when no artist are found on search', async() => {


        let req,res;
        req = {params: {artistName:"noartist"}};
        res = {

            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        
        };

        musicBrainzSearchService.getCountByArtist.mockResolvedValue('0');
       
        await searchWithAPIController.getCollectionByArtist(req,res);
        expect(res.status).toHaveBeenCalledWith(404);

    }); 

    it('return 500 if service throws an error', async() => {


        let req,res;
        req = {params: {artistName:"artist"}};
        res = {

            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        
        };

        musicBrainzSearchService.getCountByArtist.mockRejectedValue(new Error('error connecting to music brains api'));
       
        await searchWithAPIController.getCollectionByArtist(req,res);
        expect(res.status).toHaveBeenCalledWith(500);

    }); 

}); 



    


