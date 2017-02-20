
angular
  .module('solo.ItinFactory', ['solo.createItinController'])
  .factory('ItinFactory', ItinFactory);

function ItinFactory($http) {
  return {
    post(title, author, authorLocation, authorZip, stops) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/create',
        data: {
          title,
          author,
          authorLocation,
          authorZip,
          stops,
        },
      });
    },
  };
}
