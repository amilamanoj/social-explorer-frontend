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
            $scope.newRating.ratedUser = $scope.aplication[2]; // host
        }
        // i'm the host, so i rate the applicant
        else{
            $scope.newRating.ratedUser = $scope.aplication[1]; // application
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
    $scope.click1 = function (param) {
        console.log('Click(' + param + ')');
    };

    $scope.mouseHover1 = function (param) {
        console.log('mouseHover(' + param + ')');
        $scope.hoverRating1 = param;
    };

    $scope.mouseLeave1 = function (param) {
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating1 = param + '*';
    };

    $scope.click2 = function (param) {
        console.log('Click');
    };

    $scope.mouseHover2 = function (param) {
        console.log('mouseHover(' + param + ')');
        $scope.hoverRating1 = param;
    };

    $scope.mouseLeave2 = function (param) {
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating2 = param + '*';
    };



});


app.directive('starRating2', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                                       <img ng-src='{{((hoverValue + _rating) <= $index) && \"star-empty-lg.png\" || \"star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'/> </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;

            $scope.isolatedClick = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope.rating = $scope._rating = param;
                $scope.hoverValue = 0;
                $scope.click({
                    param: param
                });
            };

            $scope.isolatedMouseHover = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = 0;
                $scope.hoverValue = param;
                $scope.mouseHover({
                    param: param
                });
            };

            $scope.isolatedMouseLeave = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = $scope.rating;
                $scope.hoverValue = 0;
                $scope.mouseLeave({
                    param: param
                });
            };


        }
    };
});