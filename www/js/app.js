// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','firebase','app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform,$rootScope,$firebaseAuth,$firebase,$window,$ionicLoading,MainService,$state,$ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    MainService.connect();

    $rootScope.$on('event:app-LoginSuccessfull', function() {
    //if login succesfull go to home page
    $state.go('homePage');
    });

    $rootScope.$on('event:app-LogOutSuccessfull', function() {
    //if logOut succesfull go to home page
    $state.go('login');
  });

  });
})