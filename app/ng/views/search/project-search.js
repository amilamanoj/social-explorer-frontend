'use strict';

angular.module('myApp.projects')

    .constant('projectSearchState', {
        name: 'projects.search',
        options: {
            
            url: '.discover',
         
            views: {
                'content@root': {
                    templateUrl: 'views/search/project-search.html',
                    controller: 'ProjectSearchCtrl'
                }
                // 'outside@root': {
                //     templateUrl: 'views/search/project-search-buttons.html',
                //     controller: 'projectSearchButtonCtrl'
                // }
            },

            ncyBreadcrumb: {
                label: "Projects",
                parent: "root"
            }

        }

    })

    .controller('ProjectSearchCtrl', function($scope, Project) {
        $scope.projects = Project.query();

        $scope.$on('projectCreated', function(ev, project){
            $scope.projects.push(project);
        });


    });
