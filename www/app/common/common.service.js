commonModule.factory('CommonService', ['$http', '$q', function($http, $q){
	return {
		ajaxCall: function(pUrl,pType,pDataType,pData,pAsync,pTimeout,pSuccess,pError) {
			/*
				To make ajax calls for communication with server.
			*/
			var dfd = $q.defer();
			try{
				$http({
					url: pUrl,
					method: pType,
					headers: {'Content-Type': pDataType},
					params: {"Key":JSON.stringify(pData)},
					async: pAsync || true,
					timeout: 1000*60*(pTimeout || 5)
				}).success(function(response){
					dfd.resolve(response);
				}).error(function(data, status, headers, config, statusText){
					navigator.notification.alert("Could not process the request right now. Please try again later.",null,"Server Request","OK");
					debug("Error in ajax request: " + data);
					debug("Error status: " + status + " - " + statusText);
					dfd.reject(data);
				});
			}catch(ex){
				printLog(d,"Exception in ajaxCall: " + ex.message);
				return null;
			}
			return dfd.promise;
		}
	}
}]);
