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
		          console.log(user);
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
	          	
	            $rootScope.user = user;
	            console.log("Successfull"+ user.uid+" "+$rootScope.userid );
	            $rootScope.$broadcast('event:app-SignUpSuccessfull');
	            //return user.uid;
	          }
	          else {
	            console.log("UNNNSuccessfull");
	            if (error.code == 'INVALID_EMAIL') {
	            	console.log("inavalid email");
	              $rootScope.$broadcast('event:app-invalidCredentials');
	            }
	            else if (error.code == 'EMAIL_TAKEN') {
	            	console.log("email taken");
	            	$rootScope.signIn_error="Email already taken";
	              $rootScope.$broadcast('event:app-emailAlreadyTaken');
	            }
	            else {
	            	console.log("inavalid");
	              $rootScope.login_error="Network Error";
	            }
	          }
	        });
		},
		createDBNode : function(ID,type,profileData)
		{
			console.log("Profile Create");
			//console.log(name+" "+email+" "+phoneNo);
			var usersRef = authRef.child(type).child(ID);
    		usersRef.set(profileData);
		},
		getDBValues :function(rootElement,type)
		{
			console.log("Getting Values" + rootElement);
			var dbRef=authRef.child(type).child(rootElement);
			dbRef.once("value", function(snapshot) {
				$rootScope.userProfile=snapshot.val();
  			console.log(snapshot.val().full_name+"succesfull");
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	};

}])

.service('MainService', ['Mainfactory','$rootScope',function(Mainfactory,$rootScope){

	
		this.connect = function()
		{
			console.log('In Connect');
			Mainfactory.connect();
			Mainfactory.getAuth();
		};
		//Sign-Up page service
		this.createUser = function(name,email,phoneNo,password)
		{
			console.log("In service");
			Mainfactory.createUser(email,password);
		 	$rootScope.$on('event:app-SignUpSuccessfull', function() {
    		//if login succesfull go to home page
            console.log("In service "+$rootScope.user.uid);
            var profileData={
        			full_name: name,
        			e_mail: email, 
        			e_mail_verified:false,
        			phone_number:phoneNo,
        			phone_number_verified:false,
        			profile_pic:""
    		};
			Mainfactory.createDBNode($rootScope.user.uid,"Profiles",profileData);  //node name,node type,json data

            });
		};

		this.logIn = function(email,password)
		{

			console.log('In service');
			console.log(email +" "+password);
			Mainfactory.logIn(email,password);
			$rootScope.$on('event:app-LoginSuccessfull', function() {
    		//if login succesfull go to home page
            console.log("Get Value call "+$rootScope.user.uid);
           
			Mainfactory.getDBValues($rootScope.user.uid,"Profiles");  //node name,node type,json data

            });
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

