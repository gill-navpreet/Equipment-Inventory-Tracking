angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope) {
	
	var app = this;

	// hide html until page its true
	app.loadme = false;


	$rootScope.$on('$routeChangeStart', function() {
		if(Auth.isLoggedIn()) {
			app.isLoggedIn = true;
			Auth.getUser().then(function(data) { 
				app.username = data.data.username;
				app.useremail = data.data.email;
				app.loadme = true;
			});
		} else {
			app.isLoggedIn = false;
			app.username = '';
			app.loadme = true;
		}
	});


	this.doLogin = function(loginData){
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(data) {
			if(data.data.success){
				app.loading = false;
				//Create Success Message
				app.successMsg = data.data.message +'....Redirecting';
				//Redirect to home page
				$timeout(function(){
					$location.path('/about');
					app.loginData = '';
					app.successMsg = false;
				}, 2000);
			} else {
				//Create on error message
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};


	this.logout = function() {
		Auth.logout();
		$location.path('/logout');
		$timeout(function() {
			$location.path('/');
		}, 2000);

	};
});






