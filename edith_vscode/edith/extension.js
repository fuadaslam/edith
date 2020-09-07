const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 * 
 */


function sentVoice(obj){


	const request = require('request');
	const data = JSON.parse(obj)
	console.log(data);
	request({
		url: 'https://hello-edith.herokuapp.com/voice-query',
		method: "POST",
		headers: {
			"content-type": "application/json",
			},
		json: data
		}, function (error, resp, body) {
			if (err) { return console.log(err); }
		});
		
	
}


 function playSound(){

	var fs = require('fs');
	var player = require('play-sound')(opts = {})

 	player.play('/tmp/welcome.mp3', function (err) {
		if (err) throw err;
		console.log("Audio finished");
		// fs.unlinkSync('/tmp/welcome.mp3');

 });


 }

 function micListen(){

	var record = require('node-mic-record')
	var fs = require('fs')
	var request = require('request')

	exports.parseResult = function (err, resp, body) {

		let obj = body
		sentVoice(obj);
		
		setTimeout(function () {
				playSound();
				console.log("play")
			  }, 3000)
	  }
	  console.log("here")
	  
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
	
	return "ok"
	

 }




function activate(context) {

	const myListen = 'edith.listen';

	vscode.commands.registerCommand(myListen, function () {
		
		vscode.window.showInformationMessage('Edith is listening...');
		// do(1, 1).then(done);

		micListen();
		

		// if(micListen.success()){
		// 	playSound();
		// }
		// micListen().then(playSound);
	// 	setTimeout(function () {
	// 	playSound();
	// 	console.log("play")
	//   }, 8000)
		
		
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
