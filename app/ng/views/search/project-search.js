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

    .controller('ProjectSearchCtrl', function($scope, $state, Project, CountryService) {
        $scope.projects = Project.query();
        $scope.goToProject = goToProject;
        //$scope.searchProject = searchProject;
        $scope.selectedFromDate = new Date();
        var selToDate = new Date();
        selToDate.setFullYear(selToDate.getFullYear() + 2);
        $scope.selectedToDate = selToDate;
        $scope.countries = CountryService.countries;
        $scope.goToHome = goToHome;

        $scope.dateRangeFilter = function (project) {

            var projectFromDate = new Date(project.fromDate);
            var projectToDate = new Date(project.toDate);

            return $scope.selectedFromDate < projectFromDate && $scope.selectedToDate > projectToDate;
        };

        function goToProject(proj){
            console.log("going to project");
            $state.go('projects.detail', {'projectId': proj._id });
        }

        function goToHome(){
            console.log("going to home");
            $state.reload();
        }
    });
