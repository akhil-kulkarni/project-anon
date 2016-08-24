registerModule.controller('RegisterCtrl',['RegisterService', 'CountryOptionsList', function(RegisterService, CountryOptionsList){
	this.regForm = {};

	this.countryOptionsList = CountryOptionsList;

	this.sexOptionList = [
		{"value": null,"display": "Select"},
		{"value": "M","display": "Male"},
		{"value": "F","display": "Female"}
	];

	this.regForm.SEX = this.regForm.SEX || null;
	this.regForm.COUNTRY = this.regForm.COUNTRY || null;

	this.onCountryChange = function(){
		if(!!this.regForm.COUNTRY){
			this.regForm.COUNTRY_CODE = this.regForm.COUNTRY.COUNTRY_CODE;
		}
	};

	this.onSubmit = function(){
		RegisterService.onSubmit(this.regForm);
	};

}]);

registerModule.factory('RegisterService', ['$q', '$http', function($q, $http){
	return {
		onSubmit: function(regForm) {
			console.log("regForm: " + JSON.stringify(regForm));

			CommonService.ajaxCall(URL + '/fetch', 'POST', 'application/json', {"REQ": {"ACN": "COUNTRY_LIST"}}, true, 2).then(
				function(response){
					console.log("country list success callback: " + (!!response?response.length:null));
					if(!!response && !!response.data){
						response.data.unshift({"country_code": null, "country_name": "Select"});
						dfd.resolve(response.data);
					}
					else{
						dfd.reject("could not fetch the country options list");
					}
				},
				function(response){
					console.log("error callback: " + JSON.stringify(response));
					dfd.reject("could not fetch the country options list");
				}
			);
			return dfd.promise;
		},

		getCountryOptionList: function(){
			debug("in getCountryOptionList");
			var dfd = $q.defer();
			CommonService.ajaxCall(URL + '/fetch', 'POST', 'application/json', {"REQ": {"ACN": "COUNTRY_LIST"}}, true, 2).then(
				function(response){
					console.log("country list success callback: " + (!!response?response.length:null));
					if(!!response && !!response.data){
						response.data.unshift({"country_code": null, "country_name": "Select"});
						dfd.resolve(response.data);
					}
					else{
						dfd.reject("could not fetch the country options list");
					}
				},
				function(response){
					console.log("error callback: " + JSON.stringify(response));
					dfd.reject("could not fetch the country options list");
				}
			);
			return dfd.promise;
		}
	};
}]);
