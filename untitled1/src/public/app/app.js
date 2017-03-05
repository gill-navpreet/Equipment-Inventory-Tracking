angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate','mainController','authServices'])

.config(function($httpProvider) {
	//configuring application to intercept all http requests with the AuthInterceptors factory that was created which assigns the tokens to the header.  
	$httpProvider.interceptors.push('AuthInterceptors');
});