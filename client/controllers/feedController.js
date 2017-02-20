angular
  .module('solo.feedController', ['ngRoute', 'ParamsFactory', 'ProfileFactory', 'UserFactory'])
  .controller('feedController', feedController);

function feedController($scope, ParamsFactory, ProfileFactory, UserFactory) {
  $scope.username = UserFactory.username;
  $scope.menuStyle = '';

// setting scope to ItinFactory's currentItins. Giving us access to that array of itineraries
// $scope.currentItins = service.getItineraries

  if (ParamsFactory.params !== {}) {
    HttpFactory.getItineraries(ParamsFactory.params).then((data) => {
    $scope.currentItins = data;
    });
  }

// $scope.searchZip = ItinFactory.searchZip;
// $scope.searchCity = ParamsFactory.name;

// logging searchZip
// console.log('searchZip', $scope.searchZip);
// console.log('itins',$scope.currentItins);
// console.log(ItinFactory)

  $scope.gotoMyItineraries = ProfileFactory.gotoMyItineraries;
  $scope.gotoFavorites = ProfileFactory.gotoFavorites;
  $scope.gotoFriends = ProfileFactory.gotoFriends;
  $scope.logout = ProfileFactory.logout;

  $scope.gotoItinerary = (itinerary) => {
    ParamsFactory.params = { type: 'city', name: itinerary };
    $window.location.href = '#/itinerary';
  };

  $scope.clickDelegation = (event) => {
    if (event.target.className.indexOf('profile') === -1) {
      $scope.menuStyle = '';
    }
  };

  $scope.openProfile = () => {
    if ($scope.menuStyle === '') {
      $scope.menuStyle = 'openMenu';
    } else {
      $scope.menuStyle = '';
    }
  };
}
