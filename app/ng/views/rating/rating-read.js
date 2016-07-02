'use strict';

angular.module('myApp.profile')

    .constant('profileRating', {
        name: 'profile.rating',
        options: {


            url: '/rating',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/rating/rating-read.html',
                    controller: 'ProfileRatingCtrl'
                }

            },

            ncyBreadcrumb: {
                label: "read_rating",
                parent: "profile"
            }

        }

    })

app.controller('ProfileRatingCtrl', function($scope, $state, Profile, share,shareDataService,Project, $mdMedia, $mdDialog, currUser, $stateParams, Rating) {
    //get project of the current site
    $scope.project = Project.get({projectId: $stateParams.projectId});
    // when received the project, get all ratings from the user of this project
    $scope.project.$promise.then(function() {

        console.log($scope.project);
        $scope.loading = true;
        $scope.ratings = Rating.query({ratedUser:$scope.project.user}, function () {
            $scope.loading = false;

        });
    // when received the ratings, set the stars to the average of the ratings (only when there are ratings)
        $scope.ratings.$promise.then(function() {
            $scope.isRated = typeof $scope.ratings[0]=='undefined';
            // set str
            if (typeof $scope.ratings[0]!='undefined') {
                $scope.$watch('starRating', function () {
                    share.rating = $scope.ratings[0].rateAvg;
                });
            }
        });


    });
    // show all ratings
    $scope.ratingDialog = function(ev) {
            $mdDialog.show({

                    templateUrl: 'views/profile/ratings-all.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
    };

});

app.factory('share', function() {
    var obj = {
        rating: 0
    }
    return obj;
});

app.directive('starRating', function () {
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
        controller: function ($scope, $element, $attrs, share) {
            $scope.maxRatings = [];

            // $scope.rating = share.rating;
            $scope.$watch('rating', function() {
                $scope._rating = share.rating;
            });
            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };




        }
    };
});