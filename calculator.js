//speech synthesis- will be triggered when user selects equal button
var synth = window.speechSynthesis;

var result = document.querySelector('#display');

var enterButton = document.querySelector('#equal')


enterButton.onclick = function(event){
	event.preventDefault();
	calculator.display.value = eval(calculator.display.value);
	var spokenOutput = new SpeechSynthesisUtterance(result.value);
	spokenOutput.pitch = 1;
	spokenOutput.rate = 1;
	synth.speak(spokenOutput);
}

//speech input
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent



var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var listenButton = document.querySelector('#speechButton');

listenButton.onclick = function() {
  recognition.start();
  $('#listenAlert').text("Listening......")
}

recognition.onspeechend = function() {
  recognition.stop();
  $('#listenAlert').text("")
}

recognition.onnomatch = function() {
	alert("Speech was not heard correctly, try again. Error: " + event.error)
}

recognition.onresult = function(event) {
  var expression = event.results[0][0].transcript;
  expression = expression.replace(/\s/g, '');
  calculator.display.value = expression;
  calculator.display.value = eval(calculator.display.value);
  var spokenOutput = new SpeechSynthesisUtterance(result.value);
  spokenOutput.pitch = 1;
  spokenOutput.rate = 1;
  synth.speak(spokenOutput);

}


