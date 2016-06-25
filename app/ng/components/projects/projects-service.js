'use strict';

angular.module('myApp.projects')

    .factory('Project', function(BASEURL, $resource) {
        console.log("Calling backend...");
        return $resource(BASEURL + '/api/projects/:projectId', {projectId: '@_id'});

    });