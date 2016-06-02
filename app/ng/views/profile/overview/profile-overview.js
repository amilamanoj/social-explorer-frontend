'use strict';

angular.module('myApp.profile')

    .constant('profileOverviewState', {
        name: 'profile.overview',
        options: {


            url: '/overview',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/profile/overview/profile-overview.html',
                    controller: 'ProfileOverviewCtrl'
                }
            //     // 'outside@root': {
            //     //     templateUrl: 'views/list/project-list-buttons.html',
            //     //     controller: 'projectListButtonCtrl'
            //     // }
            },

            ncyBreadcrumb: {
                label: "Overview",
                parent: "profile"
            }

        }

    })

    .controller('ProfileOverviewCtrl', function($scope,$state, Project) {
        $scope.projects = Project.query();

        $scope.goToCreateProject = goToCreateProject;

        function goToCreateProject(){
            console.log("going to create project");
            $state.go('profile.createproj')
        }


    });

