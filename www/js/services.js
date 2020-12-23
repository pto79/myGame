angular.module('starter.services', [])

.factory('gameData', function() {
  // Might use a resource here that returns a JSON array
  var myWorld = localStorage.getItem('world');
  if(myWorld == undefined || myWorld == null  || myWorld == "")
    myWorld = '[{"World Info":{"numOfItems":0, "numOfChars":0}}]';
  myWorld = JSON.parse(myWorld);

  return {
    all: function() {
      return myWorld;
    },
    save: function() {
      localStorage.setItem('world', JSON.stringify(myWorld));
    },
    export: function() {
      return localStorage.getItem('assets');
    },
    import: function(data) {
      myWorld = JSON.parse(data);
      localStorage.setItem('assets', data);
    },
    add: function(asset) {
      myWorld.push(asset);
    },
    remove: function(asset) {
      myWorld.splice(myWorld.indexOf(asset), 1);
    },
    get: function(asset) {
      return myWorld[myWorld.indexOf(asset)];
    },
    set: function(asset) {
      myWorld[myWorld.indexOf(asset)] = asset;
    },
	searchPlayer: function(name) {
		for (i = 0; i < myWorld.length; i++) {
		  if(myWorld[i].name === name)
			  return myWorld[i];
		}
	},
	searchItem: function(name) {
		var items = [];
		for (i = 0; i < myWorld.length; i++) {
		  if(myWorld[i].link === name)
			  items.push(myWorld[i]);
		}
		return items;
	},
	clean: function() {
		localStorage.clear();
	}
  };
})

.factory('onemapService', function($http, $q) {
	
	var myToken = "";
	var expiry = 0;

  return {
    revgeocode: function(location) {
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?token=" + myToken + "&location=" + location
      }).then(function(res) {
        console.log(res);
        deferred.resolve(res.data);
      }, function(res) {
        console.log(res);
        deferred.reject(res.data);
      });
      return deferred.promise;
    },
	getToken: function() {
      var deferred = $q.defer();
      $http({
        method: "POST",
        url: "https://developers.onemap.sg/privateapi/auth/post/getToken",
		data: { "email": "bayang@gmail.com", "password": "Bayang_1117" }
		
      }).then(function(res) {
        console.log(res);
		myToken = res.data.access_token;
		expiry = res.data.expiry_timestamp;
        deferred.resolve(res.data);
      }, function(res) {
        console.log(res);
        deferred.reject(res.data);
      });
      return deferred.promise;
	},
	getExpiry: function() {
		return expiry;
	}
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
