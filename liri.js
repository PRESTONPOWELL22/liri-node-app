// These are global variables calling on dependencies__________________________________________________________________________________________________________________________________
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


require("dotenv").config()
var Twitter = require('twitter')
var Spotify = require('node-spotify-api');
var keys = require('./keys.js')
var request = require('request')
var fs = require('fs')



// this takes input from the command prompt and runs it through my switch case
var a = process.argv[2]

// This is a switch case to change what liri does based on process.argv[2]________________________________________________________________________________________________________________
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
switch(a) {
    case "movie-this":
        omdb()
          break
    case "spotify-this-song":
        spotify()
          break
    case "twitter-this":
        twitter()
          break
    default:
        console.log('enter twitter-this movie-this or spotify-this-song')
          break
}


//This is a function that makes a request to omdbAPI__________________________________________________________________________________________________________________________________
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function omdb(){

    var OMDBtitle = process.argv[3]

    var OMDBreq ="http://www.omdbapi.com/?apikey=trilogy&t=" + OMDBtitle


    request(OMDBreq, function (error, response, body) {
    //   console.log('error:', error); // Print the error if one occurred
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
        
        var arr = []
        var obj = JSON.parse(body);
        
        
        arr.push({
            'Title: ' : obj.Title,
            'Year: ' : obj.Year,
            'IMDB Rating: ' : obj.imdbRating,
            // 'Rotten Tomatoes Rating: ' : obj.Rating[1],
            'Country: ' : obj.Country,
            'Language: ' : obj.Language,
            'Plot: ' : obj.Plot,
            'Actors: ' : obj.Actors,
            
        });
        console.log(arr)
        
    });
}

//This is a function that makes a request to TwitterAPI_______________________________________________________________________________________________________________________________
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function twitter(){
    var tweets = process.argv[3]

    var client = new Twitter(keys.twitter)
       
      var params = {screen_name: 'window2recovery', count: 10};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            
            var posts = []; //empty array to hold data
            
            for (var i = 0; i < tweets.length; i++) {
              
              posts.push({
                  'created at: ' : tweets[i].created_at,
                  'Tweets: ' : tweets[i].text,
              });

            }
            console.log(posts);
        }
        
      });
    console.log("you called twitter")
}

//This is a function that makes a request to SpotifyAPI__________________________________________________________________________________________________________________________________
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function spotify(){
    var query = process.argv[3]

    if (query === undefined){
        query= 'The Sign'
    }

    var spotify = new Spotify(keys.spotify)
 
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items
        var data = []

        
        data.push({
            'artist': songs[0].artists.map(artistNames),
            'song' : songs[0].name,
            'song-preview' : songs[0].preview_url,
            'album' : songs[0].album.name,

        })

        function artistNames(artist){
            return artist.name
        }
        
        console.log(data)
    });
}



