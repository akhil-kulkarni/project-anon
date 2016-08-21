app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	"use strict";
	console.log("app config");

	if (!!IS_DEBUG)
		debug = console.debug.bind(window.console);

	if (!!PRINT_ERROR || !!PRINT_EXCEPTION)
		error = console.error.bind(window.console);

	if (!!PRINT_EXCEPTION)
		exception = console.error.bind(window.console);

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
	})
	.state("register", {
		url: "/register",
		templateUrl: "app/register/register.html",
		controller: "RegisterCtrl as rc",
		resolve: {
			CountryOptionsList: ['RegisterService',
				function(RegisterService){
					debug("resolving CountryOptionsList");
					return RegisterService.getCountryOptionList();
				}
			]
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("login");
}]);
