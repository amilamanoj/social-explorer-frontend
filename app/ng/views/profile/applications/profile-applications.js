'use strict';

angular.module('myApp.profile')

    .constant('profileApplicationsState', {
        name: 'profile.applications',
        options: {


            url: '/applications',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/profile/applications/profile-applications.html',
                    controller: 'ProfileApplicationsCtrl'
                }
            //     // 'outside@root': {
            //     //     templateUrl: 'views/list/project-list-buttons.html',
            //     //     controller: 'projectListButtonCtrl'
            //     // }
            },

            ncyBreadcrumb: {
                label: "Applications",
                parent: "profile"
            }

        }

    })

    .controller('ProfileApplicationsCtrl', function($scope, $state, Profile, $mdDialog, currUser, Application) {
   
        $scope.loading = true;
        $scope.applications = Application.query(function() {
            $scope.loading = false;
        });

        $scope.user=Profile.get({userId:currUser.getUser()._id});


        $scope.userFilter = function (application) {
            var appliedUser = application.applicant;
            var loggedInUser = currUser.getUser();
            if (appliedUser && loggedInUser) {
                return appliedUser === loggedInUser._id;
            } else {
                return false;
            }
        };
        
        $scope.confirmAndDelete = function(ev, application) {
            var confirm = $mdDialog.confirm()
                .title("Delete the application?")
                .textContent('Your application: "' + application.title + '" will be deleted.')
                .ariaLabel('Delete?')
                .targetEvent(ev)
                .ok('Delete application')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                application.$delete();
            }, function() {
                $scope.status = 'Canceled.';
            });
        };
        

    });
