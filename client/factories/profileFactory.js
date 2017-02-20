angular
  .module('ProfileFactory', [])
  .factory('ProfileFactory', ['$window', 'UserFactory', 'ParamsFactory', factory]);

function factory($window, UserFactory, ParamsFactory) {
  const service = {};

  service.gotoMyItineraries = () => {
    ParamsFactory.params = { type: 'personal' };
    $window.location.href = '#/feed';
  };

  service.gotoFavorites = () => {
    ParamsFactory.params = { type: 'favorites' };
    $window.location.href = '#/feed';
  };

  service.gotoFriends = () => {
    $window.location.href = '#/friends';
  };

  service.logout = () => {
    UserFactory = {
      username: 'Local',
      password: 'default',
      zip: '90000',
      interest: 'Bakersfield',
    };
    $window.location.href = '#/';
  };

  return service;
}
