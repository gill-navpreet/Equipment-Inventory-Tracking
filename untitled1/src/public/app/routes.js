var app = angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider

	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/about', {
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/register', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register',
		authenticated: false
	})
	
	.when('/login', {
		templateUrl: 'app/views/pages/users/login.html',
		authenticated: false
	})
	
	.when('/logout', {
		templateUrl: 'app/views/pages/users/logout.html',
		authenticated: true
	})

	.when('/profile', {
		templateUrl: 'app/views/pages/users/profile.html',
		authenticated: true
	})

	.when('/barCodeGen', {
		templateUrl: 'app/views/pages/tools/barCodeGen.html',
		authenticated: true
	})
	.otherwise({ redirectTo: '/'});


});


//restricts access from users that are not authorized
app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		if(next.$$route.authenticated == true) {
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');
			}
		} else if (next.$$route.authenticated == false) {
			if(Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/profile')
			}
		} 		
	});
}]);

