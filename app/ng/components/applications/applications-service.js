'use strict';

angular.module('myApp.applications', ['ngResource', 'ui.router'])

    .factory('Application', function(BASEURL, $resource) {
        console.log("Calling backend...");
        return $resource(BASEURL + '/api/applications/:applicationId', {applicationId: '@_id'});

    });