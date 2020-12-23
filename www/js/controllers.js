angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal, $ionicPlatform, $cordovaGeolocation, gameData, onemapService) {
	
	$scope.myWorld = gameData.all();
	$scope.myPlayer = gameData.searchPlayer('pto');
	$scope.myItem = gameData.searchItem('pto');
	console.log($scope.myItem);
	
  $ionicModal.fromTemplateUrl('templates/modal-player.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalPlayer = modal;
  });
  
  $ionicModal.fromTemplateUrl('templates/modal-inventory.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalInventory = modal;
  });
  
  $ionicModal.fromTemplateUrl('templates/modal-skill.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSkill = modal;
  });
  
  $ionicModal.fromTemplateUrl('templates/modal-world.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalWorld = modal;
  });
  

    function getGPS() {
		$ionicPlatform.ready(function() {
			var posOptions = {timeout: 30000, enableHighAccuracy: false};
			$cordovaGeolocation
			.getCurrentPosition(posOptions)
			.then(function (position) {
				
				$scope.position = position;
				console.log($scope.position);
				
				var strLatitude = position.coords.latitude + "";
				strLatitude = strLatitude.substr(0, strLatitude.indexOf(".") + 5);
				console.log(strLatitude);
				var strLongitude = position.coords.longitude + "";
				strLongitude = strLongitude.substr(0, strLongitude.indexOf(".") + 5);
				console.log(strLongitude);
				$scope.geoLocation = strLatitude + "," + strLongitude;

				onemapService.revgeocode($scope.geoLocation).then(function(res){
				  //localStorage.setItem('exchangeRate', JSON.stringify(res));
				  //$ionicLoading.hide();
				  $scope.geoResult = JSON.stringify(res);
				})
				
			}, function(err) {
				// error
				//alert('error');
			});
		})
    }

  
  $scope.getPosition = function() {
	$scope.geoResult = "N.A";
	getGPS();
	

	/*
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			$scope.$apply(function(){
				$scope.geoResult = "Latitude: " + position.coords.latitude +
				"<br>Longitude: " + position.coords.longitude;
				var strLatitude = position.coords.latitude + "";
				strLatitude = strLatitude.substr(0, strLatitude.indexOf(".") + 5);
				console.log(strLatitude);
				var strLongitude = position.coords.longitude + "";
				strLongitude = strLongitude.substr(0, strLongitude.indexOf(".") + 5);
				console.log(strLongitude);
				$scope.geoLocation = strLatitude + "," + strLongitude;
				searchService.get($scope.geoLocation).then(function(res){
				  //localStorage.setItem('exchangeRate', JSON.stringify(res));
				  //$ionicLoading.hide();
				  $scope.geoResult = JSON.stringify(res);
				})
			});
		});
	} else {
		$scope.geoResult = "Geolocation is not supported by this browser.";
	}
	*/
  }
  
  $scope.createWeapon = function() {
	  var sword = new Weapon('test sword', 10, 5, 'pto');
	  console.log(sword.durability);
	  sword.use();
	  console.log(sword.durability);
	  gameData.add(sword);
	  gameData.save();
  }
  
  $scope.createPlayer = function() {
	  var player = new Player('pto');
	  gameData.add(player);
	  gameData.save();
  }
  
   $scope.saveWorld = function() {
		gameData.save();
  }
  
   $scope.cleanWorld = function() {
		gameData.clean();
  }
  
  var n = Date.now();
  if (n > onemapService.getExpiry())
  {
  	onemapService.getToken();
  }
				
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

;
