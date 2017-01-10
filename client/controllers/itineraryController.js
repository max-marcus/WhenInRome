angular
  .module('ItineraryController', ['ngRoute', 'HttpFactory'])
  .controller('ItineraryController', ['$scope', '$window', 'HttpFactory', 'ParamsFactory', itineraryController]);

  function itineraryController($scope, $window, HttpFactory, ParamsFactory){
    HttpFactory.getItinerary(ParamsFactory.params.itineraryName)
    .then((res) => {
      $scope.title = res.title;
      $scope.area = res.authorLocation;
      $scope.stops = res.stops
    })
}
