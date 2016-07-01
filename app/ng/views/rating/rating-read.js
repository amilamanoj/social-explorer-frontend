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

app.controller('ProfileRatingCtrl', function($scope, $state, Profile, shareDataService,Project, $mdMedia, $mdDialog, currUser, $stateParams, Rating) {

    $scope.project = Project.get({projectId: $stateParams.projectId});
    $scope.starRating2;
    $scope.ratings;
    $scope.project.$promise.then(function() {

        console.log($scope.project);
        $scope.loading = true;
        $scope.ratings = Rating.query({ratedUser:$scope.project.user}, function () {
            $scope.loading = false;
            $scope.$parent.selectedIndex = 1;
            var varIndex;

            var varIndex2;
            for (varIndex = 0; varIndex < $scope.ratings.length; ++varIndex) {
                var appl = $scope.ratings[varIndex];
                Project.get({projectId:appl.project}, function (proj) {

                    var result = $scope.ratings.filter(function (obj) {
                        return obj.project == proj._id;
                    });
                    result[0].pTitle = proj.title;
                });
            }
            for (varIndex2 = 0; varIndex2 < $scope.ratings.length; ++varIndex2) {
                var user = $scope.ratings[varIndex2];
                Profile.get({userId: user.createdUser}, function (userr) {
                    var result = $scope.ratings.filter(function (obj) {
                        return obj.createdUser == userr._id;
                    });
                    result[0].cUser = userr.username;
                });
            }

        });

        $scope.ratings.$promise.then(function() {
            console.log($scope.ratings);
            console.log("ersaerf"+( typeof $scope.ratings[0]=='undefined'));
            $scope.isRated = typeof $scope.ratings[0]=='undefined';
            $scope.starRating2=2;

        });


    });

    $scope.ratingDialog = function(ev) {


            $mdDialog.show({

                    templateUrl: 'views/profile/ratings-all.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
    };





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
                    <img ng-src='{{( _rating) <= $index && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
                   /> </div>",
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
            


        }
    };
});