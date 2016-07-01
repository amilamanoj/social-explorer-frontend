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
        //$scope.searchProject = searchProject;
        $scope.selectedFromDate = new Date();
        $scope.selectedToDate = new Date();

        //$scope.project = Project.get({projectId: $stateParams.projectId});

        function searchProject() {
            //get the fromDate user has picked in the date picker

            //compare this date with the fromDates of the project base

            //show results

            //do the same for toDate, host and country too
        }

        function goToProject(proj){
            console.log("going to project");
            $state.go('projects.detail', {'projectId': proj._id });
        }
    });
