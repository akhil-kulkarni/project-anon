loginModule.controller('LoginCtrl',['LoginService', 'CommonService', '$state', function(LoginService, CommonService, $state){
	this.username = 'akhil';
	this.password = 'test';

	this.onSubmit = function(){
		//LoginService.onSubmit(this.username, this.password);
		alert(CommonService.test());
	};

	this.signInGoogle = function(){
		LoginService.signInGoogle();
	};

	this.register = function(){
		$state.go('register');
	};
}]);

loginModule.factory('LoginService',['$http', '$state', function($http, $state){
	if (typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function (str){
			return this.indexOf(str) == 0;
		};
	}
	return{
		onSubmit: function(username, password){
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
		},

		signInGoogle: function(){
			try{
				console.log("in sign in google");
				var requestToken = null;
				var accessToken = null;
				var clientId = GOOGLE_CLIENT_ID;

				$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/urlshortener email&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
				ref.addEventListener('loadstart', function(event) {
					if((event.url).startsWith("http://localhost/callback")) {
						requestToken = (event.url).split("code=")[1];
						$http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + GOOGLE_SECRET_KEY + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
						.success(function(data) {
							accessToken = data.access_token;
							$http({method: "post", url: "https://www.googleapis.com/oauth2/v3/tokeninfo", data: "access_token=" + accessToken }).success(
								function(tokenInfo){
									alert(JSON.stringify(tokenInfo));
									$state.go("profile");
								}
							)
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
		}
	}
}]);
