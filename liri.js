// These are global variables calling on dependencies__________________________________________________________________________________________________________________________________
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


require("dotenv").config()
var Twitter = require('twitter')
var Spotify = require('node-spotify-api');
var keys = require("./keys.js")
var request = require('request')



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
    case "default":
        console.log('enter twitter-this movie-this or spotify-this-song')
          break
}


//This is a function that makes a request to omdbAPI__________________________________________________________________________________________________________________________________
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function omdb(){


    var OMDBtitle = process.argv[3]

    var OMDBreq ="http://www.omdbapi.com/?apikey=trilogy&t=" + OMDBtitle


    request(OMDBreq, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });
}

//This is a function that makes a request to TwitterAPI_______________________________________________________________________________________________________________________________
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function twitter(){
    var tweets = process.argv[3]

    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
      });
       
      var params = {screen_name: 'window2recovery'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets);
        }
        
      });
    console.log("you called twitter")
}

//This is a function that makes a request to SpotifyAPI__________________________________________________________________________________________________________________________________
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function spotify(){
    var query = process.argv[3]

    var spotify = new Spotify({
      id: keys.spotify.id,
      secret: keys.spotify.secret
    });
 
    spotify.search({ type: 'track', query: query }, function(err, data) {
     if (err) {
     return console.log('Error occurred: ' + err);
    }
 
    console.log(data.tracks); 
    });

    console.log("you called spotify")
}


