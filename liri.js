require("dotenv").config();
var axios = require("axios")
var keys = require("./keys.js")
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs")
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

liriIt(command, input);

function bandsIt(input){
        axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function(res){
            var data = res.data;
            for (var i = 0; i < data.length; i++){
                console.log(`
Venues: ${data[i].venue.name}
Venue Location: ${data[i].venue.city} + ${data[i].venue.country}
Date of Event: ${moment(data[i].datetime).format("MM/DD/YYYY")}`)
            }
        })
}

function spotifyIt(input){
    spotify
    .search({ type: 'track', query: input, limit: 1 })
    .then(function(response) {
    console.log(response);
    })
    .catch(function(err) {
    console.log(err);
    });
}

function movieIt(input){
    axios.get("https://www.omdbapi.com/?t=" + input + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(function(ans){
        var data = ans.data;
        console.log(`
Title: ${data.Title}
Year: ${data.Year}
IMDB Rating: ${data.imdbRating}
Rotten Tomatoes Rating: ${data.tomatoRating}
Country(s) Produced In: ${data.Country}
Language: ${data.Language}
Plot: ${data.Plot}
Actors: ${data.Actors}
        `)
    }) 
}
    
function doIt(input){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
        return console.log(error);
        }
        //console.log(data);
        var dataArr = data.split(",");
        command = dataArr[0]
        input = dataArr[1].split('"');
        liriIt(command, input);
    });
}

function liriIt(command, input) {
    switch (command) {
      case 'concert-this':
        if (input) { 
          bandsIt(input);
          break;
        } else{ 
          console.log('Put a band name!')
          break;
        }
      case 'spotify-this-song':
        if (input) { 
          spotifyIt(input);
          break;
        } else{ 
          spotifyIt('The Sign');
          break;
        }
      case 'movie-this':
        if (input) { 
          movieIt(input);
          break;
        } else{ 
          movieIt('Mr. Nobody');
          break;
        }  
      case 'do-what-it-says':
        doIt(command, input);
        break;
    }
  };