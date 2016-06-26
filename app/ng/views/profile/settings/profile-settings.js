'use strict';

angular.module('myApp.profile')

    .constant('profileSettingsState', {
        name: 'profile.settings',
        options: {


            url: '/settings',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/profile/settings/profile-settings.html',
                    controller: 'ProfileSettingsCtrl'
                }


            },

            ncyBreadcrumb: {
                label: "Settings",
                parent: "profile"
            }

        }

    })
    // .controller('ProfileSettingsCtrl', function($scope, $state, Profile, currUser) {
    //
    //     $scope.loading = true;
    //     $scope.projects = Project.query(function() {
    //         $scope.loading = false;
    //     });
    //
    //
    //     $scope.edit = function (ev, currUser){
    //
    //         $state.go('profile.editprofile',{user: currUser});
    //     }
    //
    // });
