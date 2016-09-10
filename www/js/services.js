angular.module('app.services', [])

.factory('Mainfactory', ['$firebaseAuth','$firebase','$rootScope',function($firebaseAuth,$firebase,$rootScope){

	var baseUrl="https://roomexpens.firebaseio.com/";

	var authRef="";
	var auth="";

	return {
		all: function(a,b)
		{
			console.log("In factory"+a+" "+b);
		},
		connect: function()
		{
			console.log('In authRef');
			authRef=new Firebase(baseUrl);
		},
		getAuth: function()
		{
			console.log('In auth');
			auth=$firebaseAuth(authRef);
		},
		logIn: function(email,password)
		{
			auth.$login('password', {
				           email: email,
				           password: password
			        })
			        .then(function (user) 
				        {
				         console.log("Successfull"+user.uid);
				         $rootScope.user=user;
				         $rootScope.$broadcast('event:app-LoginSuccessfull');
				        },
				         function (error) 
					       {
					          
					          if (error.code == 'INVALID_EMAIL' || error.code == 'INVALID_PASSWORD' || error.code == 'INVALID_USER') 
					          {
					          	$rootScope.login_error="Invalid credentials";
					            $rootScope.$broadcast('event:app-invalidCredentials');
					          }
					         else
					          {
					            $rootScope.login_error="Network Error";
					            $rootScope.$broadcast('event:app-networkError');
        					}
        				}
        		);
		},
		logOut : function()
		{
			auth.$logOut();
			authRef=null;
			$rootScope.$broadcast('event:app-LogOutSuccessfull');
		},
		checkSession : function()
		{
			var auth = new FirebaseSimpleLogin(authRef, function(error, user) {
		        if (error) {
		          // no action yet.. redirect to default route
		          $rootScope.user=null;
		          $rootScope.$broadcast('event:app-NoSeesions');
		        } else if (user) {
		          // user authenticated with Firebase
		          $rootScope.user = user;
		          $rootScope.$broadcast('event:app-LoginSuccessfull');
		        } else {
		          // user is logged out
		          $rootScope.user = null;
		          $rootScope.$broadcast('event:app-LogOutSuccessfull');
		        }
		      });
		},
		createUser : function(email,password)
		{
			console.log("factory");
			console.log(email+" "+password);
			auth.$createUser(email, password, function (error, user) {
	          if (!error) {
	          	console.log("Successfull"+user.uid);
	            $rootScope.user = user;
	            $rootScope.$broadcast('event:app-LoginSuccessfull');
	            //auth.child
	            return 1;
	          }
	          else {
	            console.log("UNNNSuccessfull");
	            if (error.code == 'INVALID_EMAIL') {
	            	console.log("inavalid email");
	              $rootScope.$broadcast('event:app-invalidCredentials');
	              return 0;
	            }
	            else if (error.code == 'EMAIL_TAKEN') {
	            	console.log("email taken");
	            	$rootScope.signIn_error="Email already taken";
	              $rootScope.$broadcast('event:app-emailAlreadyTaken');
	              return 0;
	            }
	            else {
	            	console.log("inavalid");
	              $rootScope.login_error="Network Error";
	              return 0;
	            }
	          }
	        });
	}

	};

}])

.service('MainService', ['Mainfactory',function(Mainfactory){

	
		this.connect = function()
		{
			console.log('In Connect');
			Mainfactory.connect();
			Mainfactory.getAuth();
		};

		this.createUser = function(email,password)
		{
			console.log("In service");
			Mainfactory.createUser(email,password);
		};

		this.logIn = function(email,password)
		{

			console.log('In service');
			console.log(email +" "+password);
			Mainfactory.logIn(email,password);
		};

		this.logOut = function()
		{
			Mainfactory.logOut();
		};

		this.checkSession = function()
		{
			Mainfactory.checkSession();
		};

		this.show = function(text)
		{};

		this.notify = function(text)
		{};

		this.hide = function()
		{};

		

	
}]);

