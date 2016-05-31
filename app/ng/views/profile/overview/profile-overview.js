'use strict';

angular.module('myApp.profile')

    .constant('profileOverviewState', {
        name: 'profile.overview',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/projects' (because '/projects' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            // views: {
            //     'content@root': {
            //         templateUrl: 'views/profile/overview/profile-overview.html',
            //         controller: 'ProfileOverviewCtrl'
            //     }
            //     // 'outside@root': {
            //     //     templateUrl: 'views/list/project-list-buttons.html',
            //     //     controller: 'projectListButtonCtrl'
            //     // }
            // },

            ncyBreadcrumb: {
                label: "Overview",
                parent: "profile"
            }

        }

    })

    .controller('ProfileOverviewCtrl', function($scope, Project) {
        console.log("scope: " + $scope);
        $scope.projects = Project.query();
        console.log("profile: " + $scope.projects);

        // $scope.$on('projectCreated', function(ev, project){
        //     $scope.projects.push(project);
        // });


    });

    