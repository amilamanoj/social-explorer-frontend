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
     .controller('ProfileSettingsCtrl', function($scope, $state, Profile, currUser, $rootScope, $mdToast) {

         $scope.updateUser = updateUser;
         $scope.cancel = cancel;

         $scope.user=Profile.get({userId:currUser.getUser()._id});
         console.log("iam here");


         function updateUser(){
             console.log("edit user");
             $scope.newUser = new Profile();
             $scope.newUser._id = this.user._id;
             $scope.newUser.username = this.user.username;
             $scope.newUser.email = this.user.email;
             $scope.newUser.age = this.user.age;
             $scope.newUser.country = this.user.country;
             $scope.newUser.city = this.user.city;
             $scope.newUser.description = this.user.description;


             if (this.user.image!= undefined) {
                 $scope.newUser.img = this.user.image.base64;
             }

             console.log($scope.newUser);


             $scope.newUser.$update()
                 .then(function(){
                     $rootScope.$broadcast('profileUpdate', $scope.newUser);
                     $state.go('profile.settings');
                     showSimpleToast("Profile updated!")
                 }).catch(function(e){
                 console.log("error: " + e);
                 showSimpleToast("User update failed: " + e);

             });
         }


         function cancel(){
             $state.go('profile.settings')
         }



         function showSimpleToast(txt){
             $mdToast.show(
                 $mdToast.simple()
                     .textContent(txt)
                     .position('bottom right')
                     .hideDelay(3000)

             );
         }


     });
