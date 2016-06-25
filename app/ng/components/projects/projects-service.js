'use strict';

angular.module('myApp.projects')

    .factory('Project', function( $resource) {
        console.log("Calling backend...");
        return $resource('https://soexb.herokuapp.com/api/projects/:projectId', {projectId: '@_id'});

    });