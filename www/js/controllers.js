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

	$rootScope.signIn = function(name,email,phoneNo,password)
	{
		console.log("in login");
		console.log(email +" "+password);

		MainService.createUser(name,email,phoneNo,password);
	}



}])
   
.controller('homePageCtrl',['$scope', '$rootScope', function($scope) {

}])

.controller('setPictureCtrl', function($scope) {
	console.log("in Set Picture");
})
 