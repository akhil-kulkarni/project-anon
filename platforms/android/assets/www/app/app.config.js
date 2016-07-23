app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	"use strict";
	console.log("app config");

	$stateProvider
	.state("login", {
		url: "/login",
		templateUrl: "app/login/login.html",
		controller: "LoginCtrl as login"
	})
	.state("profile", {
		url: "/profile",
		templateUrl: "app/profile/profile.html"/*,
		controller: "ProfileCtrl as profile"*/
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("login");
}]);
