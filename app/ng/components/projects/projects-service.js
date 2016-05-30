'use strict';

angular.module('myApp.projects')

    .factory('Project', function( $resource) {
        console.log("Calling backend...");
        return $resource('http://localhost:3000/api/projects/:projectId', {projectId: '@_id'});

    });