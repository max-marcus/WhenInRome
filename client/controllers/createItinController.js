angular
  .module('solo.createItinController', ['ngRoute', 'ngMap'])
  .controller('createItinController', ['$scope', '$location', '$http', '$window', 'UserFactory', 'HttpFactory', 'ProfileFactory', 'ParamsFactory', createItinController]);

function createItinController($scope, $location, $http, $window, UserFactory, HttpFactory, ProfileFactory, ParamsFactory) {
  $scope.username = UserFactory.username;
  $scope.menuStyle = '';
  //HOLDS ALL STOPS ADDED TO ITINERARY
  $scope.stops = [];

  //ADDSTOP LETS YOU ADD ADDITIONAL STOPS ON THE ITINERARY
  $scope.addStop = function () {
    HttpFactory.searchLocation($scope.placeName)
    .then((res) => {
      console.log(res);
      $scope.location = res.formatted_address;
      if (res.icon) $scope.icon = res.icon;
    })
    .then(function () {
      const title = $scope.placeName.slice(0, $scope.placeName.indexOf(', '));
      $scope.stops.push({
        placeName: title,
        location: $scope.location,
        description: $scope.description,
        stopNumber: $scope.stops.length + 1,
        iconLink: $scope.icon
      });
    })
    .then(function () {
      $scope.placeName = '';
      $scope.description = '';
    })
  };

  //REMOVESTOP LETS YOU REMOVE A STOP ON THE ITINERARY
  $scope.removeStop = function(i){
    $scope.stops.splice(i, 1);
  }

  //UPDATESCOPE SETS THE SCOPE FROM NG-CHANGE INPUTS IN THE CREATEITN.HTML FILE
  $scope.updateScope = function(inputName, inputValue){
    $scope[inputName] = inputValue;
   // console.log($scope[inputName])
  }

  //SAVES ITINERARY TO DATABASE VIA HTTPFACTORY
  $scope.save = function () {
    HttpFactory.createItin(
      $scope.title,
      UserFactory.username,
      $scope.authorLocation,
      $scope.authorZip,
      $scope.stops
    )
    .then(function () {
      ParamsFactory.params.itineraryName = $scope.title;
      $window.location.href = '#itinerary';
    });
  }

  //GETLOCATION ALLOWS US TO GET THE CURRENT POSITION OF THE USER AS WELL AS CREATE THE authorZip FROM GEOLOCATION
  $scope.getLocation = function (loc, x) {
    if (loc === 'cur') {
      navigator.geolocation.getCurrentPosition(function (position) {
        HttpFactory.getCurLocation(position)
        .then((res) => {
          console.log('getLocation result: ', res);
          $scope.authorLocation = res.formatted_address;
          $scope.authorZip = res.formatted_address.slice(-10).slice(0, 5);
          $scope.authorCoords = res.geometry.location.lat + ", " + res.geometry.location.lng;
        });
      });
    } else {
      HttpFactory.searchLocation(x)
      .then((res) => {
        console.log(res);
        $scope.authorLocation = res.formatted_address;
        $scope.authorZip = res.formatted_address.slice(-10).slice(0, 5);
        $scope.authorCoords = res.geometry.location.lat + ", " + res.geometry.location.lng;
      })
    }
  }

  // $scope.gotoMyItineraries = ProfileFactory.gotoMyItineraries;
  // $scope.gotoFavorites = ProfileFactory.gotoFavorites;
  // $scope.gotoFriends = ProfileFactory.gotoFriends;
  // $scope.logout = ProfileFactory.logout;

  $scope.clickDelegation = (event) =>{
    if(event.target.className.indexOf('profile') === -1){
      $scope.menuStyle = '';
    }
  };

  $scope.openProfile = () =>{
    if($scope.menuStyle === ''){
      $scope.menuStyle = 'openMenu';
    }else{
      $scope.menuStyle = '';
    }
  };
}
