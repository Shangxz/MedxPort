var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function($scope, $firebaseObject) {
	var ref = new Firebase("https://medxport.firebaseio.com");
	ref.createUser({
		email    : "bobtony@firebase.com",
		password : "correcthorsebatterystaple"
	}, function(error, userData) {
		if (error) {
			console.log("Error creating user:", error);
		} else {
			console.log("Successfully created user account with uid:", userData.uid);
		}
	});
	ref.authWithPassword({
		email    : "bobtony@firebase.com",
		password : "correcthorsebatterystaple"
	}, function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
		}
	});
});