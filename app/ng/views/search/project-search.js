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

    .controller('ProjectSearchCtrl', function($scope, $state, Project) {
        $scope.projects = Project.query();
        $scope.goToProject = goToProject;

        function searchProjectByFromDate(){
            console.log("searching for a project by the given starting date");
        }

        function searchProjectByToDate(){
            console.log("searching for a project by the given ending date");
        }

        function searchProjectByHost(){
            console.log("searching for a project by the host");
        }

        function searchProjectByCountry(){
            console.log("searching for a project by country");
        }

        function goToProject(proj){
            console.log("going to project");
            $state.go('projects.detail', {'projectId': proj._id });
        }
    });
