'use strict';

angular.module('myApp.profile')

    .constant('profileWriteRating', {
        name: 'profile.writerating',
        options: {


            url: '/rating',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/rating/rating-write.html',
                    controller: 'ProfileWriteRatingCtrl'
                }

            },

            ncyBreadcrumb: {
                label: "write_rating",
                parent: "profile"
            }

        }

    })

app.controller('ProfileWriteRatingCtrl', function(shareDataServiceRating,$scope, $state, $mdToast,Profile,$rootScope, shareDataService,Project, $mdMedia, $mdDialog, currUser, Rating, $stateParams) {

    $scope.aplication = shareDataServiceRating.getProducts();
     $scope.saveRating = saveRating;
    // $scope.cancel = cancel;

    function saveRating(){

        $scope.newRating = new Rating();
        $scope.newRating.createdUser = currUser.getUser()._id;
        $scope.newRating.rate = this.starRating1;
        // i'm the applicant, so i rate the host
        if(currUser.getUser()._id==$scope.aplication[1]) {
            $scope.newRating.ratedUser = $scope.aplication[1];
        }
        // i'm the host, so i rate the applicant
        else{
            $scope.newRating.ratedUser = $scope.aplication[2];
        }
        $scope.newRating.createdDate = new Date();
        $scope.newRating.description = this.rating.description;
        $scope.newRating.project = $scope.aplication[0];

        console.log($scope.newRating);

         $scope.newRating.$save()
            .then(function(){
               $rootScope.$broadcast('ratingCreated', $scope.newRating);
                 showSimpleToast("Rating created!");
                $mdDialog.cancel();
            }).catch(function(e){
             console.log("error: " + e);
             showSimpleToast("Project creation failed: " + e);

         });
    }

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    function showSimpleToast(txt) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(txt)
                .position('bottom right')
                .hideDelay(3000)
        );
    }



});