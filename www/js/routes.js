angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

    .state('landingPage', {
    url: '/page1',
    templateUrl: 'templates/landingPage.html',
    controller: 'landingPageCtrl'
  })

  .state('login', {
    url: '/page2',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page3',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('homePage', {
    url: '/page4',
    templateUrl: 'templates/homePage.html',
    controller: 'homePageCtrl'
  })

      .state('setPicture', {
    url: '/page5',
    templateUrl: 'templates/setPicture.html',
    controller: 'setPictureCtrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});