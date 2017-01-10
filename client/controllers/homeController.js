angular
  .module('solo.HomeController', ['ngRoute', 'ngMap', 'solo.ItinFactory',
   'UserFactory', 'HttpFactory', 'ParamsFactory', 'ProfileFactory'])
  .controller('HomeController', HomeController);

function HomeController($scope, ItinFactory, $http, UserFactory, HttpFactory, $window, ParamsFactory, ProfileFactory) {
  $scope.username = UserFactory.username;
  $scope.menuStyle = '';

  // getLocation uses HTML5 geolocation then passes those coords into google maps geocode to get a formatted address
  $scope.getLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyD5p6W-TtJzphQvH7dRLKyB968SiTXHxig')
          .success(function (data) {
            console.log("Full Data returned from getLocation", data.results[0]);
            console.log("address components",data.results[0].address_components[2].long_name)
            //$scope.location = data.results[0].formatted_address;
            $scope.city = data.results[0].address_components[2].long_name;
            //ParamsFactory

          });
      });
    }
  };

  $scope.searchLocation = function (location) {
    if (!location) {
      alert('NO SEARCH QUERY');
      return;
    }
    // Querying Geocode API to get ZIP code of {{location}} search input to pass to ItinFactory
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyD5p6W-TtJzphQvH7dRLKyB968SiTXHxig')
      .success(function (data) {
        console.log("Geocode result", data)
        ItinFactory.searchZip = data.results[0].formatted_address.slice(-10).slice(0, 5);
      });

    // Making a GET request for ALL itins upon search click and saving to ItinFactory
    // Redirecting to feed

    $http.get('/itins').then(function (data) {
      ItinFactory.currentItins = data.data;
      window.location = '/#/feed';
    });
  };

  // initializing pull of last three submitted itineraries
  $http.get('/itins').then(function (data) {
    let recent = data.data.slice(-3);

    //HttpFactory.getLandscape('pig');

    $scope.landscapes = [
      {'background-image': 'url(http://blog.worldcraze.com/wp-content/uploads/2016/03/road-trip-hillaryfox.jpg)'},
      {'background-image': 'url(http://www.dailystormer.com/wp-content/uploads/2014/07/Walk-in-the-Park.jpg)'},
      {'background-image': 'url(http://www.simwings.net/wp-content/uploads/2015/12/plane-flying.jpg)'}
    ];

    $scope.lastThree = recent;
  });

  $scope.gotoMyItineraries = ProfileFactory.gotoMyItineraries;
  $scope.gotoFavorites = ProfileFactory.gotoFavorites;
  $scope.gotoFriends = ProfileFactory.gotoFriends;
  $scope.logout = ProfileFactory.logout;

  $scope.gotoItinerary = (itinerary) =>{
    ParamsFactory.params = {itineraryName: itinerary};
    $window.location.href = '#/itinerary';
  }

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



// Playing with Maps Geomety to calculate distance between two coordinates
// This could be used to give more control of proximity search

// var _kCord = new google.maps.LatLng(-36.874694, 174.735292);
// var _pCord = new google.maps.LatLng(-36.858317, 174.782284);
// console.log(google.maps.geometry.spherical.computeDistanceBetween(_pCord, _kCord));
