loginModule.controller('LoginCtrl',['LoginService', function(LoginService){
	this.username = 'akhil';
	this.password = 'test';

	this.onSubmit = function(){
		LoginService.onSubmit(this.username, this.password);
	};

	this.signInGoogle = function(){
		LoginService.signInGoogle();
	};
}]);
loginModule.service('LoginService',['$http', '$state', function($http, $state){
	this.onSubmit = function(username, password){
		console.log("in onSubmit");
		console.log("username: " + username);
		console.log("password: " + password);
		$http({
			method: 'POST',
			url: 'http://192.168.1.236:3000/login',
			headers: {'Content-Type': 'application/json'},
			data: {"Key": {"REQ": {"USERNAME": username, "PASSWORD": password}}}
		}).then(
			function successCallback(response) {
				console.log("success callback: " + JSON.stringify(response));
				if(!!response && response.data=="success")
					$state.go("profile");
			},
			function errorCallback(response) {
				console.log("error callback: " + JSON.stringify(response));
			}
		);
	};

	this.signInGoogle = function(){
		try{
			var requestToken = null;
			var accessToken = null;
			var clientId = null;

			if(ionic.Platform.isAndroid())
				clientId = "383591290055-ktr31mnja3uqc321u4opvd7mljgva2e4.apps.googleusercontent.com";
			else if(ionic.Platform.isIOS())
				clientId = "383591290055-larrfelqa3c6detofm4kn2q49p0j09f7.apps.googleusercontent.com";

			console.log("in sign in google");
			$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
			ref.addEventListener('loadstart', function(event) {
				if((event.url).startsWith("http://localhost/callback")) {
					requestToken = (event.url).split("code=")[1];
					$http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + "" + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
					.success(function(data) {
						accessToken = data.access_token;
						$state.go("profile");
					})
					.error(function(data, status) {
						alert("ERROR: " + JSON.stringify(data));
					});
					ref.close();
				}
			});
		} catch(ex){
			console.log("Exception: " + ex.message);
		}
	};

	if (typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function (str){
			return this.indexOf(str) == 0;
		};
	}

}]);
