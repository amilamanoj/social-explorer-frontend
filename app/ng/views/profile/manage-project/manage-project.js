'use strict';

angular.module('myApp.profile')

    .constant('profileManageProjectState', {
        name: 'profile.manageProject',
        options: {


            url: '/{projectId}/manage',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/profile/manage-project/manage-project.html',
                    controller: 'ProfileManageProjectCtrl'
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

    .controller('ProfileManageProjectCtrl', function($scope, $state, Profile, Project, $mdDialog, $stateParams,
                                                     $mdMedia, currUser, Application) {
   
        $scope.loading = true;
        $scope.project = Project.get({projectId: $stateParams.projectId});
        $scope.applications = Application.query({project:$stateParams.projectId}, function() {
            $scope.loading = false;
            var varIndex;

            for (varIndex = 0; varIndex < $scope.applications.length; ++varIndex) {
                var appl =  $scope.applications[varIndex];
                    var currApplicant = Profile.get({userId:appl.applicant}, function ()  {
                        // console.log(currApplicant);
                        appl.pApplicant = currApplicant;
                    });

            }
        });

        $scope.user=Profile.get({userId:currUser.getUser()._id});


        $scope.lookAtProfile = function(ev, appl) {

            if(currUser.loggedIn()) {

                $scope.projectUser = appl.pApplicant;
                console.log($scope.projectUser);

                $mdDialog.show({

                        templateUrl: 'views/profile/manage-project/profile-applicant.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true

                    })

                    .then(function (answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
                $scope.$watch(function () {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function (wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });
            }

            else{
                $mdDialog.show({

                    templateUrl: 'views/profile/dialog-not-logged.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
            }
        };
        

    });

