angular.module('App').controller('Home1Ctrl', function ($scope, $rootScope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, EventsService) {
	
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
	

  var events = EventsService.$asArray();
  events.$loaded().then(function () {
    $scope.today = events[new Date().getDay()];
  });

});
