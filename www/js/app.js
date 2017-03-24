angular.module('starter', ['ionic'])
 
.controller('AppCtrl', function($scope) {
 
document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

window.TTS.speak({
text: 'Welcome to the app! Welcome to the app! Welcome to the app! Welcome to the app!',
locale: 'en-GB',
rate: 0.75
}, function () {
alert('success');
}, function (reason) {
alert(reason);

});
} 
 
  $scope.data = {
    speechText: ''
  };
  $scope.recognizedText = '';
 
  $scope.speakText = function() {
    TTS.speak({
           text: $scope.data.speechText,
           locale: 'en-GB',
           rate: 1.5
       }, function () {
           // Do Something after success
       }, function (reason) {
           // Handle the error case
       });
  };
 
  $scope.record = function() {
    var recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            $scope.recognizedText = event.results[0][0].transcript;
            $scope.$apply()
        }
    };
    recognition.start();
  };
});