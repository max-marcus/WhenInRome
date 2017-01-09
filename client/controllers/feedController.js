angular
  .module('solo.feedController', ['ngRoute', 'solo.ItinFactory', 'ParamsFactory'])
  .controller('feedController', feedController);

function feedController($scope, ItinFactory, ParamsFactory) {

	// let params = ParamsFactory.params;
	// if (params.type === 'zip'){
	// 	return httpFactory.getItineraries({'type':'zip', 'code': params.code})

	// }
	// else if (params.type === 'city'){
	// 	return httpFactory.getItineraries({'type': 'city', 'name': params.name})
	// }

	// else if (params.type === )

//setting scope to ItinFactory's currentItins. Giving us access to that array of itineraries
$scope.currentItins = ItinFactory.currentItins;
$scope.searchZip = ItinFactory.searchZip;

//logging searchZip
console.log('searchZip', $scope.searchZip);
console.log('itins',$scope.currentItins);
console.log(ItinFactory)



}
