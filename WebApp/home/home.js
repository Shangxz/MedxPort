var app = angular.module("medxport", ["firebase"]);
var data = sessionStorage['dat'];
app.factory("Auth", ["$firebaseAuth",
	function($firebaseAuth) {
		var ref = new Firebase("https://medxport.firebaseio.com");
		return $firebaseAuth(ref);
	}
	]);

app.controller("homeCtrl", ["$scope", "Auth",
	function($scope, Auth) {
		$scope.userData = data;
		console.log("here");
		//This calls the users data for when the come onto the page
		var ref = new Firebase("https://medxport.firebaseio.com/users/" + data);
		var userInfo = [];

		ref.on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
		    // key will be "fred" the first time and "barney" the second time
		    var key = childSnapshot.key();
		    // childData will be the actual contents of the child
		    var childData = childSnapshot.val();
		    userInfo.push(childData);
		});
			$scope.isNew = userInfo[0].isNew;
			console.log($scope.isNew);
			$scope.type = userInfo[0].type;
			console.log($scope.type); 
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

		//This pulls clinic data
		/*ref = new Firebase("https://medxport.firebaseio.com/Clinics/");
		$scope.clinics = [];
		$scope.ids = [];
		//$scope.data = $firebaseObject(ref);
		$scope.messages = $firebaseObject(ref);
		console.log($scope.messages);
		console.log($scope.data);
		$scope.$watch($scope.messages,$scope.clinics.push($scope.messages.));	
		*/
		ref = new Firebase("https://medxport.firebaseio.com/Clinics/");
		var clinics = [];
		var ids = [];
		var selected;
		var id = 0;
		var names = [];
		ref.on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
		    // key will be "fred" the first time and "barney" the second time
		    var key = childSnapshot.key();
		    // childData will be the actual contents of the child
		    var childData = childSnapshot.val();
		    console.log(childData);
		    clinics.push(childData.clinicName);
		});
			for(key in snapshot.val()){
				ids.push(key);
			}

			var mySelect = $('#clinicSelection');
			$.each(clinics, function(val, text) {
				mySelect.append(
					$('<option></option>').val(val).html(text)
					);
			});
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
		var authUrl = new Firebase("https://medxport.firebaseio.com");
		var e = document.getElementById("clinicSelection");
		var index = e.selectedIndex;

			//dynammically detects change in
			$('#clinicSelection').change(function(){
				names = [];
				console.log(names);
				selected = $(this).find(':selected').text();
				id = ($(this).find(':selected').val());
				console.log(ids[id]);
			   //query on change
			   var query = new Firebase("https://medxport.firebaseio.com/Clinics/" + ids[id] + "/doctorIds/"); 
			   query.on("value", function(snapshot) {
			   	console.log(snapshot.val());
			   	for(var key in snapshot.val()) {
				  	//gets the first names of doctors
				  	names.push(snapshot.val()[key]);
				  	console.log(names);
				  }
				  var mySelect = $('#doctorSelection');
				  mySelect.empty();
				  $.each(names, function(val, text) {
				  	mySelect.html(
				  		$('<option></option>').val(val).html(text)
				  		);
				  });
				}, function (errorObject) {
					console.log("The read failed: " + errorObject.code);
				});
			});
		$('#masterform').submit(function() {
		    var values = $(this).serialize();
		    console.log(values);
		});
	}
]);
