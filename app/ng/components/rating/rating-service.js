'use strict';

angular.module('myApp.rating', ['ngResource', 'ui.router'])

    .factory('Rating', function(BASEURL, $resource) {
        console.log("Calling backend (rating)...");
        return $resource(BASEURL + '/api/ratings/:ratingId', {ratingId: '@_id'});

    });