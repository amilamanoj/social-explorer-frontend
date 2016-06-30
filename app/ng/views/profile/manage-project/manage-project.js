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
                    Profile.get({userId:appl.applicant}, function (currApplicant)  {
                        var result = $scope.applications.filter(function( obj ) {
                            return obj.applicant == currApplicant._id;
                        });
                        result[0].pApplicant = currApplicant;
                    });

            }
        });

        $scope.user=Profile.get({userId:currUser.getUser()._id});


        $scope.lookAtProfile = function(ev, appl) {

            if(currUser.loggedIn()) {

                $mdDialog.show({

                        templateUrl: 'views/profile/manage-project/profile-applicant.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        locals: {
                            applicant: appl.pApplicant,
                            statement: appl.statement
                        },
                        controller: DialogController
                    })

                    .then(function (answer) {
                        console.log(answer);
                        appl.status = answer;
                        appl.processedDate = new Date();
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
                // $scope.$watch(function () {
                //     return $mdMedia('xs') || $mdMedia('sm');
                // }, function (wantsFullScreen) {
                //     $scope.customFullscreen = (wantsFullScreen === true);
                // });
            }

        };

        function DialogController($scope, $mdDialog, statement, applicant) {
            $scope.applicant = applicant;
            $scope.statement = statement;
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
        

    });

