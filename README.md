###### music app ##########
##
This app is built with express for routing the traffic with axios to perform invocation to music brainz microservice
We also have an inmemory cache using noode-cache so that calls are reduced to the musicbrains service

The API spec it supports would be 

# there is v1 version which is directly invoking the api

## /music-app/search/v1/artist/{band or artist}
This endpoint returns the name of artists with id when there are multiple artists that matches or returns all the releases if its a single artist thats found

## /music-app/search/v1/artist/{artistid}/releases
This endpoint returns the releases associated to the artist by provided artist id



## Example API's for different scenarios

1. http://localhost:8081/music-app/search/v1/artist/99jakes - This is an artist that matches exactly 1 record and hence returns all the releavent releases
2. http://localhost:8081/music-app/search/v1/artist/rahman - This api returns list of artistid and artistname as there are multiple occurances returned 
3. http://localhost:8081/music-app/search/v1/artist/e0bba708-bdd3-478d-84ea-c706413bedab/releases - This api returns the relavent information associated to the artis by id
4. http://localhost:8081/music-app/search/v1/artist/e0bba708-bdd3-478d-84ea-c706413bedab444/releases - passing invalid artist id returns 404 

