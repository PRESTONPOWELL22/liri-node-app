require("dotenv").config()

var keys = require("./keys.js")

// var spotify = new Spotify(keys.spotify)
// var client = new Twitter(keys.twitter)

var a = process.argv[3]

var b = process.argv[4]

console.log(keys.spotify)
console.log(keys.twitter)
