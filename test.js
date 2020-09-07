// function playSound(){
//
//   var play = require('play').Play();
//   play.sound('test.wav', function(){
//
//     // these are all "fire and forget", no callback
//     play.sound('test');
//
//
//   });
//
//
//
// }
//
//
// var record = require('node-mic-record')
// var fs = require('fs')
// var request = require('request')
//
// 	var file = fs.createWriteStream('test.wav', { encoding: 'binary' })
//
// 	record.start({
//   sampleRate : 44100,
//   verbose : true,
//   recordProgram: 'arecord'
// }).pipe(file)
//
// 	// Stop recording after three seconds
// 	setTimeout(function () {
// 	  record.stop()
// 	}, 3000)
//
// 	console.log("audiso");
//   playSound();
//
// exports.parseResult = function (err, resp, body) {
//   console.log(body)
// }
//
// record.start(
// 		{
// 		sampleRate : 44100,
// 		verbose : true,
// 		recordProgram: 'arecord',
//     silence: '3.0'
// 		}
// 	).pipe(request.post({
// 		'url'     : 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
// 		'headers' : {
// 		  'Accept'        : 'application/vnd.wit.20160202+json',
// 		  'Authorization' : 'Bearer ' + 'N2Y36TQWIDJ52VVFBKDJQOV4VVWZJQKL',
// 		  'Content-Type'  : 'audio/wav'
// 		}
// 	  }, exports.parseResult))
//
//     setTimeout(function () {
//       record.stop()
//     }, 3000)

// var player = require('play-sound')(opts = {})
//
//  player.play('test.wav', function (err) {
//    // if (err) throw err;
//    console.log("Audio finished");
//  });




//
// const https = require('http');
//
// https.get('http://127.0.0.1:8080/query/what is github', (resp) => {
//   let data = '';
//
//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });
//
//   console.log("data"+data);
//
//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(JSON.parse(data).explanation);
//   });
//
// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });


let obj = {
  "entities": {
    "question:question": [
      {
        "body": "facebook",
        "confidence": 0.6903,
        "end": 16,
        "entities": [],
        "id": "949758038769175",
        "name": "question",
        "role": "question",
        "start": 8,
        "suggested": true,
        "type": "value",
        "value": "facebook"
      }
    ]
  },
  "intents": [
    {
      "confidence": 0.9063,
      "id": "749035279001021",
      "name": "search"
    }
  ],
  "text": "what is facebook",
  "traits": {}
}


const request = require('request');
     request({
       url: 'http://127.0.0.1:8080/voice-query',
       method: "POST",
       headers: {
           "content-type": "application/json",
           },
       json: obj
   //  body: JSON.stringify(requestData)
       }, function (error, resp, body) {
  if (err) { return console.log(err); }
  console.log(body.response);
  // console.log(body.explanation);
});


// var rec = require('node-mic-record')
// var request = require('request')
//
// var witToken = process.env.WIT_TOKEN = 'N2Y36TQWIDJ52VVFBKDJQOV4VVWZJQKL'; // get one from wit.ai!
//
// exports.parseResult = function (err, resp, body) {
//   console.log(body)
// }
//
// rec.start().pipe(request.post({
//   'url'     : 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
//   'headers' : {
//     'Accept'        : 'application/vnd.wit.20160202+json',
//     'Authorization' : 'Bearer ' + witToken,
//     'Content-Type'  : 'audio/wav'
//   }
// }, exports.parseResult))
