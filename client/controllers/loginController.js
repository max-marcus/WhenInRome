angular
  .module('solo.loginController', ['ngRoute', 'HttpFactory', 'UserFactory']) // will need http factory to work
  .controller('loginController', ['$scope', '$window', 'HttpFactory', 'UserFactory', loginController]);

  function loginController($scope, $window, HttpFactory, UserFactory) {
    $scope.loginFunc = () => {
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      HttpFactory.userValid($scope.username, $scope.password)
      .then((data) => {
        if (data.data.username) {
          UserFactory.username = data.data.username;
            UserFactory.password = data.data.password;
            UserFactory.zip = data.data.zip;
            UserFactory.interest = data.data.interest;
            $window.location.href = '#/home';
        } else {
          const big = document.querySelector('#big');
          big.style.display = 'block';
        }
      });
    };

    $scope.errorFunc = () => {
      const big = document.querySelector('#big');
      big.style.display = 'none';
    };

    $scope.berrorFunc = () => {
      const big = document.querySelector('#dig');
      big.style.display = 'none';
    };

    $scope.signupFunc = () => {
      document.getElementById('createUsername').value = '';
      document.getElementById('createPassword').value = '';
      document.getElementById('createZipcode').value = '';
      document.getElementById('createInterest').value = '';
      HttpFactory.userCreate($scope.createUsername, $scope.createPassword, $scope.createZipcode, $scope.createInterest)
      .then((data) => {
        if (data.data.username === undefined ||
            data.data.password === undefined ||
            data.data.interest === undefined ||
            data.data.zip === undefined) {
          const dig = document.querySelector('#dig');
          dig.style.display = 'block';
        } else {
          $window.location.href = '#/home';
        }
      });
    };
  }
