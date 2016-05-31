'use strict';

angular.module('myApp.projects')

    .directive('mvProjectCard', function() {
        return {
            restrict: 'A',
            scope: {
                project: '='
            },
            templateUrl: 'components/project-card/project-card.html'
        };
    });
