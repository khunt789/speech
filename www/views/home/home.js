angular.module('App').controller('HomeCtrl', function ($scope, $rootScope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, EventsService) {
	
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
	
	
	
	$scope.searchData = {};
  var comment = {
    message: '',
    rating: 5
  };
  $scope.comment = angular.copy(comment);

  $scope.sendComments = function () {
    // Send comment
    $scope.cancelComments();
    $ionicPopup.alert({
      title: 'Thank you!',
      template: 'We appreciate your comments!',
      okText: 'Close'
    });
  };

  $scope.cancelComments = function () {
    $scope.comment = angular.copy(comment);
    $scope.modal.hide();
  }

  $scope.openComments = function() {
    $ionicModal.fromTemplateUrl('views/home/comments.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    if ($scope.modal) {
      $scope.modal.remove();
    }
  });

	
	$scope.onSearch = function () {
		 if (!$scope.searchData.text) {
			  return;
		 }

			 var params = {
					url: $scope.searchData.text
			  }


		  $http.post('http://localhost/grabing/phonegap.php',{url:$scope.searchData.text }, function (data) {
				if (data.status.result == 1) {
						$ionicPopup.alert( 
						{
								title: 'error',
								subTitle: res.message,
								okType: 'buttonhk'
							}
						);
						return;
					}
					if (data.status == 'success' || data.status == 'SUCCESS') {
						$scope.hideLoading();
						$scope.weather2 = data;
					}						
				
		  });

	};	
	
	
  $http.get('http://localhost/grabing/phonegap.php?url=http://www.google.co.in').success(function (data) {
    $scope.weather2 = data;
  });
	
/*
  $http.get('http://api.openweathermap.org/data/2.5/weather?q=Key%20West,FL&units=imperial').success(function (data) {
    $scope.weather = data;
  });
*/
  var events = EventsService.$asArray();
  events.$loaded().then(function () {
    $scope.today = events[new Date().getDay()];
  });

});
