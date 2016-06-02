'use strict';

angular.module('myApp.profile')

    .constant('profileCreateProjState', {
        name: 'profile.createproj',
        options: {


            url: '/new-project',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/profile/new-project/new-project.html',
                    controller: 'ProfileCreateProjCtrl'
                }
            //     // 'outside@root': {
            //     //     templateUrl: 'views/list/project-list-buttons.html',
            //     //     controller: 'projectListButtonCtrl'
            //     // }
            },

            ncyBreadcrumb: {
                label: "Create Project",
                parent: "profile"
            }

        }

    })

    .controller('ProfileCreateProjCtrl', function($scope, Project) {
        console.log("scope is: " + $scope);
        $scope.projects = Project.query();
        // console.log("profile: " + $scope.projects);




    });

