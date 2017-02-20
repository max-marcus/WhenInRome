angular
  .module('UserFactory', ['UserFactory'])
  .factory('UserFactory', [UserFactory]);

function UserFactory() {
  return {
    username: 'Local',
    password: 'default',
    zip: '90000',
    interest: 'Bakersfield',
  };
}
