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
		},

		getCountryOptionList: function(){
			debug("in getCountryOptionList");
			var dfd = $q.defer();
			$http({
				method: 'POST',
				url: 'http://192.168.1.4:3000/fetchData',
				headers: {'Content-Type': 'application/json'},
				data: {"Key": {"REQ": {"ACN": "COUNTRY_LIST"}}}
			}).then(
				function successCallback(response) {
					console.log("country list success callback: " + (!!response?response.length:null));
					if(!!response && !!response.data){
						response.data.unshift({"country_code": null, "country_name": "Select"});
						dfd.resolve(response.data);
					}
					else{
						dfd.reject("could not fetch the country options list");
					}
				},
				function errorCallback(response) {
					console.log("error callback: " + JSON.stringify(response));
					dfd.reject("could not fetch the country options list");
				}
			);
			return dfd.promise;
		}
	};
}]);
