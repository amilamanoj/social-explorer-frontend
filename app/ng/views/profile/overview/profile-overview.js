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

    .controller('ProfileOverviewCtrl', function($scope, $state, Profile, $mdDialog, currUser, Project) {
   
        $scope.loading = true;
        $scope.projects = Project.query(function() {
            $scope.loading = false;
        });

        $scope.user=Profile.get({userId:currUser.getUser()._id});

        $scope.goToCreateProject = goToCreateProject;

        function goToCreateProject(){
            console.log("going to create project");
            $state.go('profile.createproj')
        }

        $scope.userFilter = function (project) {
            var projectUser = project.user;
            var loggedInUser = currUser.getUser();
            if (projectUser && loggedInUser) {
                return projectUser === loggedInUser._id;
            } else {
                return false;
            }
        };
        
        $scope.confirmAndDelete = function(ev, proj) {
            var confirm = $mdDialog.confirm()
                .title("Delete the project?")
                .textContent('Your project: "' + proj.title + '" will be deleted.')
                .ariaLabel('Delete?')
                .targetEvent(ev)
                .ok('Delete project')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                proj.$delete();
            }, function() {
                $scope.status = 'Canceled.';
            });
        };

        $scope.edit = function (ev, proj){

            $state.go('profile.editproj',{project: proj});
        }

    });

