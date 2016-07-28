registerModule.controller('RegisterCtrl',['RegisterService', function(RegisterService){
	this.regForm = {};

	this.onSubmit = function(){
		RegisterService.onSubmit(this.regForm);
	};

}]);

registerModule.factory('RegisterService', [function(){
	return {
		onSubmit: function(regForm){
			console.log("regForm: " + JSON.stringify(regForm));
		}
	};
}]);
