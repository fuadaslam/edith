
const vscode = require('vscode');




/**
 * @param {vscode.ExtensionContext} context
 * 
 */


function sentVoice(obj){


	const request = require('request');
	request({
		url: 'http://127.0.0.1:8080/voice-query',
		method: "POST",
		headers: {
			"content-type": "application/json",
			},
		json: obj
		}, function (error, resp, body) {
			if (err) { return console.log(err); }
		});
		
	
}


 function playSound(){

	var player = require('play-sound')(opts = {})

 	player.play('/tmp/welcome.mp3', function (err) {
		if (err) throw err;
		console.log("Audio finished");
		try {
			fs.unlinkSync('/tmp/welcome.mp3')
		} catch(err){
			console.error(err)
		}
 });



 }

 function micListen(){

	var record = require('node-mic-record')
	var fs = require('fs')
	var request = require('request')

	exports.parseResult = function (err, resp, body) {

		let obj = body
		console.log(body)
		sentVoice(obj);
		// let obj = JSON.parse(body)
		// console.log(obj.entities[0]);;
	  }
	  
	  record.start(
			  {
			  sampleRate : 44100,
			  verbose : true,
			  recordProgram: 'arecord',
		  silence: '3.0'
			  }
		  ).pipe(request.post({
			  'url'     : 'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
			  'headers' : {
				'Accept'        : 'application/vnd.wit.20160202+json',
				'Authorization' : 'Bearer ' + 'N2Y36TQWIDJ52VVFBKDJQOV4VVWZJQKL',
				'Content-Type'  : 'audio/wav'
			  }
			}, exports.parseResult))
	  
		  setTimeout(function () {
			record.stop()
		  }, 5000)
	

 }




function activate(context) {

	const myListen = 'edith.listen';

	vscode.commands.registerCommand(myListen, function () {
		
		vscode.window.showInformationMessage('Edith is listening...');
		micListen();
		setTimeout(function () {
		playSound();
		console.log("play")
	  }, 8000)
		
		
	});
	

	let myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 300);

	myStatusBarItem.command = myListen;
	myStatusBarItem.text = 'Edith';
	
		
	context.subscriptions.push(myStatusBarItem);
	myStatusBarItem.show();
	console.log('Congratulations, your extension "edith" is now active!');
}


exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
