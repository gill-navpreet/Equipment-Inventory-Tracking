angular.module('userControllers',['userServices'])

.controller('regCtrl', function($http,$location, $timeout,User){

	var app = this;

	this.regUser = function(regData){
		app.loading = true;
		app.errorMsg = false;

		User.create(app.regData).then(function(data) {
			if(data.data.success){
				app.loading = false;
				//Create Success Message
				app.successMsg = data.data.message +'....Redirecting';
				//Redirect to home page
				$timeout(function(){
					$location.path('/');
				}, 2000);
			} else {
				app.loading = false;
				//Create on error message
				app.errorMsg = data.data.message;
			}
		});
	};
});


