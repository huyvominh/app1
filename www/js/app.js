// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('AppCtrl', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {
	$scope.name = '';
	$scope.birthday = '';
	//$scope.birthday = new Date('Wed Sep 09 1989 00:00:00 GMT+0700 (SE Asia Standard Time)');
	
	$scope.isDisableSubmit = function(){
		if($scope.name == '' || $scope.birthday == '' || $scope.birthday == 'undefined' || typeof $scope.birthday === 'undefined'){
			return true;
		}
		return false;
	}
	
	$scope.submit = function(){
		if(!$scope.isDisableSubmit()){
			var message = '';
			var toDay = new Date();
			
			
			if(toDay < $scope.birthday){
				message = 'What do you mean \'You came from the future\'?';
			}else{
				var days = calculateNextBirthday($scope.birthday, toDay);
				
				if(days == 0){
					message = 'Your birthday is today!';
				}else{
					message = 'Your birthday will be in ' + days + ' days from now.';
				}
			}
			
			var alertPopup = $ionicPopup.alert({
				title: 'Hi ' + $scope.name + ',',
				template: message
			});
			
			alertPopup.then(function(res) {
				console.log('alert closed!');
			});
		}
	}
	
	function calculateNextBirthday(your_birthday, now){
		var month = your_birthday.getMonth();
		var day = your_birthday.getDate();
		var year = now.getFullYear();
		your_birthday = new Date(year, month, day);

		if(month == now.getMonth() && day == now.getDate()){
			return 0;
		}
		
		if(your_birthday < now){
			your_birthday = new Date(year + 1, month, day);
		}
		
		var diff = now - your_birthday;
		
		return Math.abs(millisecondsToDays(diff));

	}
	
	function millisecondsToDays (milliseconds) {
		var temp = Math.floor(milliseconds / 1000);
		var days = Math.floor((temp %= 31536000) / 86400);
		return days;
	}
}]);
