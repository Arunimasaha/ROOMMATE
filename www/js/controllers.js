angular.module('app.controllers', ['app.services'])
  
.controller('landingPageCtrl', function($scope) {

})
   
.controller('loginCtrl',['$scope', '$rootScope','MainService',function($scope,$rootScope,MainService) {

	
	$rootScope.logIn = function(email,password)
	{
		console.log("in login");
		console.log(email +" "+password);

		MainService.logIn(email,password);
	}


}])
   
.controller('signupCtrl', ['$scope', '$rootScope','MainService',function($scope,$rootScope,MainService) {

	$rootScope.signIn = function(email,password)
	{
		console.log("in login");
		console.log(email +" "+password);

		MainService.createUser(email,password);

		$rootScope.$on('event:app-LoginSuccessfull', function() {
    //if login succesfull go to home page
		    console.log("In controller "+$rootScope.user.uid);
		    });
	}



}])
   
.controller('homePageCtrl', function($scope) {

})
 