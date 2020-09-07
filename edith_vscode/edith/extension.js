
const vscode = require('vscode');




/**
 * @param {vscode.ExtensionContext} context
 * 
 */



 function playSound(){

	var player = require('play-sound')(opts = {})

 	player.play('test.wav', function (err) {
  	 // if (err) throw err;
	console.log("Audio finished");
	   
 });



 }

 function micListen(){

	var record = require('node-mic-record')
	var fs = require('fs')
	
	var file = fs.createWriteStream('test.wav', { encoding: 'binary' })
	
	record.start({
		sampleRate : 44100,
		verbose : true,
		recordProgram: 'arecord'
	  }
		
	).pipe(file)
	
	// Stop recording after three seconds
	setTimeout(function () {
	  record.stop()
	  console.log("audiso")
	}, 5000)
	// playSound();
	

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
