contactApp.controller('appCtrl', ['$scope','$http','$window', function($scope,$http,$window){
	console.log("Hello world from controller");
	var refresh = function(){
	$http.get('/personlist').success(function(response){
		console.log("i got the data which i received");
		$scope.personlist =response;
		$scope.contact=""; // to clear our contact box
	});
};
refresh(); // to refresh the page and  will show just add contact 
	$scope.addContact = function(){ // addContact function of Add Contact button 
		console.log($scope.contact._id); // this is like alert of JS
		if($scope.contact._id == undefined)
		{
			if(typeof ($scope.contact.name) == "undefined" || $scope.contact.name == "")
			{
				$window.alert("No contact details enter!");
			}
			else
			{
			$http.post('/personlist',$scope.contact).success(function(response){
			console.log(response);
			refresh(); // to middly show contac after clicking Add Contact button
				});
			}
	}
	else
	{
		$scope.contact = "";
		$window.alert("Contact already exists!");
	}
	};
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/personlist/'+ id).success(function(response){
			console.log(response);
			refresh();
		});
	};
	$scope.edit = function(id){
		console.log(id);
		$http.get('/personlist/'+id).success(function(response){
			console.log(response);
			$scope.contact=response;
		});
	};
	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/personlist/'+$scope.contact._id,$scope.contact).success(function(response){
			refresh();
		})
	};
	$scope.clear=function(){
		$scope.contact = "";
	}
}]);