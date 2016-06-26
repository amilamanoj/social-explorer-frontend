'use strict';

angular.module('myApp.profile')

    .factory('Profile', function(BASEURL, $resource) {
       console.log("Calling backend (profile)...");
        
        return $resource(BASEURL + '/user/:userId', {userId: '@_id'});


    });