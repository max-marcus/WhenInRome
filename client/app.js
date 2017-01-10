
const app = angular
  .module('myApp', ['ngRoute', 'solo.HomeController','solo.feedController',
  'solo.ItinFactory', 'solo.createItinController', 'solo.loginController', 'UserFactory', 'HttpFactory',
  'ParamsFactory', 'FriendsController', 'ProfileFactory', 'ItineraryController']);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {

  $routeProvider
      .when('/home', {
      templateUrl: './partials/home.html',
      controller: 'HomeController',
    })
      .when('/feed', {
      templateUrl: './partials/feed.html',
      controller: 'feedController',
    })
      .when('/createItin', {
        templateUrl: './partials/createItin.html',
        controller: 'createItinController',
      })
      .when('/', {
        templateUrl: './partials/login.html',
        controller: 'loginController'
      })
      .when('/itinerary', {
        templateUrl: './partials/itinerary.html',
        controller: 'ItineraryController'
      })
      .when('/friends', {
        templateUrl: './partials/friends.html',
        controller: 'FriendsController'
      });

}
