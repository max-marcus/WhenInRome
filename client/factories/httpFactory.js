angular
  .module('HttpFactory', [])
  .factory('HttpFactory', ['$http', 'UserFactory', httpFactory]);

  function httpFactory(http, UserFactory) {
    let service = {};

    service.userValid = (username, password) => {
      return http.post('/user/valid', {username: username, password: password});
    };

    service.userCreate = (username, password, zip, interest) => {
      return http.post('/user/create', {username: username, password: password, zip: zip, interest: interest});
    };

    service.getLandscape = (landscape) => {
      return http.post('/landscape', {landscape: landscape});
    };

    service.findFriend = (friend) => {
      return http.post('/findFriend', {friend: friend})
      .then((result) => {
        return result.data
      });
    };

    service.addFriend = (friend) =>{
      return http.post('/addFriend', {friend: friend, username: UserFactory.username})
      .then((result) => {
        return result.data
      });
    };

    service.getFriends = (username) =>{
      return http.post('/getFriends', {username: username}).then((result) =>{ return result.data});
    };

    service.getItineraries = (criteria) =>{
      return http.post('/getItineraries', criteria).then((result) =>{ return result.data});
    }

    service.getItinerary = (title) => {
      const config = {
        params: {
          title: title
        }
      }
      return http.get('/getItinerary', config)
      .then((res) => {
        console.log('getItinerary res in factory', res);
        return res.data
      })
    }

    service.createItin = (title, author, authorLocation, authorZip, stops, icon) => {
      const data = {
        title: title,
        author: author,
        authorLocation:  authorLocation,
        authorZip: authorZip,
        stops: stops
      }
      console.log(data);
      return http.post('/create', data)
      .then(() => {});
    }

    service.getCurLocation = (position) => {
      const config = {
        params: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      }
      return http.get('/curLocation', config)
      .then((res) => {
        return res.data.results[0]
      })
    }

    service.searchLocation = (locQuery) => {
      const config = {
        params: { query: locQuery }
      }
      return http.get('/searchLocation', config)
      .then((res) => {
        return res.data.results[0];
      });
    };

    return service;
  }
