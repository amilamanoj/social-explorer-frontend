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

    .controller('ProfileApplicationsCtrl', function($scope, $state, Profile, Project, $mdDialog, currUser, Application) {
   
        $scope.loading = true;
        $scope.applications = Application.query({applicant:currUser.getUser()._id}, function() {
            $scope.loading = false;
            var varIndex;

            for (varIndex = 0; varIndex < $scope.applications.length; ++varIndex) {
                var appl =  $scope.applications[varIndex];
                    var proj = Project.get({projectId:appl.project}, function ()  {
                        appl.pTitle = proj.title;
                    });
            
            }
        });

        $scope.user=Profile.get({userId:currUser.getUser()._id});

        
        $scope.confirmAndDelete = function(ev, application) {
            var confirm = $mdDialog.confirm()
                .title("Delete the application?")
                .textContent('Your application to: "' + application.pTitle + '" will be withdrawn.')
                .ariaLabel('Delete?')
                .targetEvent(ev)
                .ok('Withdraw application')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                application.$delete(function (response) {
                    $state.reload();
                });
            }, function() {
                $scope.status = 'Canceled.';
            });
        };
        

    });

