angular
  .module('HttpFactory', [])
  .factory('HttpFactory', ['$http', 'UserFactory', httpFactory]);

function httpFactory(http, UserFactory) {
  const service = {};

  service.userValid = (username, password) => http.post('/user/valid', { username, password });

  service.userCreate = (username, password, zip, interest) => http.post('/user/create', { username, password, zip, interest });

  service.getLandscape = landscape => http.post('/landscape', { landscape });

  service.findFriend = friend => http.post('/findFriend', { friend })
  .then(result => result.data);

  service.addFriend = friend => http.post('/addFriend', { friend, username: UserFactory.username })
  .then(result => result.data);

  service.getFriends = username => http.post('/getFriends', { username })
  .then(result => result.data);

  service.getItineraries = criteria => http.post('/getItineraries', criteria)
  .then(result => result.data);

  service.getItinerary = (title) => {
    const config = { params: { title } };
    return http.get('/getItinerary', config)
    .then(res => res.data);
  };

  service.createItin = (title, author, authorLocation, authorZip, stops, icon) => {
    const data = {
      title,
      author,
      authorLocation,
      authorZip,
      stops,
    };
    return http.post('/create', data)
    .then(() => {});
  };

  service.getCurLocation = (position) => {
    const config = {
      params: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    };
    return http.get('/curLocation', config)
    .then(res => res.data.results[0]);
  };

  service.searchLocation = (locQuery) => {
    const config = { params: { query: locQuery } };
    return http.get('/searchLocation', config)
    .then(res => res.data.results[0]);
  };

  return service;
}
