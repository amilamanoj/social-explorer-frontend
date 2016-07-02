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

    $scope.project = Project.get({projectId: $stateParams.projectId});
    $scope.starRating2;
    $scope.ratings;
    $scope.project.$promise.then(function() {

        console.log($scope.project);
        $scope.loading = true;
        $scope.ratings = Rating.query({ratedUser:$scope.project.user}, function () {
            $scope.loading = false;

        });

        $scope.ratings.$promise.then(function() {
            console.log($scope.ratings);
            console.log("ersaerf"+( typeof $scope.ratings[0]=='undefined'));
            $scope.isRated = typeof $scope.ratings[0]=='undefined';
            if (typeof $scope.ratings[0]!='undefined') {
                $scope.$watch('starRating', function () {
                    share.rating = $scope.ratings[0].rateAvg;
                });
            }
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
    // $scope.click1 = function (param) {
    //     console.log('Click(' + param + ')');
    // };
    //
    // $scope.mouseHover1 = function (param) {
    //     console.log('mouseHover(' + param + ')');
    //     $scope.hoverRating1 = param;
    // };
    //
    // $scope.mouseLeave1 = function (param) {
    //     console.log('mouseLeave(' + param + ')');
    //     $scope.hoverRating1 = param + '*';
    // };
    //
    // $scope.click2 = function (param) {
    //     console.log('Click');
    // };
    //
    // $scope.mouseHover2 = function (param) {
    //     console.log('mouseHover(' + param + ')');
    //     $scope.hoverRating1 = param;
    // };
    //
    // $scope.mouseLeave2 = function (param) {
    //     console.log('mouseLeave(' + param + ')');
    //     $scope.hoverRating2 = param + '*';
    // };





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
                                       <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
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

            $scope.rating = share.rating;
            $scope.$watch('rating', function() {
                $scope._rating = share.rating;
            });
            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            // $scope._rating = share.rating;
            // $scope.isolatedClick = function (param) {
            //     if ($scope.readOnly == 'true') return;

            //     $scope.rating = $scope._rating = param;
            //     $scope.hoverValue = 0;
            //     $scope.click({
            //         param: param
            //     });
            // };
            //
            // $scope.isolatedMouseHover = function (param) {
            //     if ($scope.readOnly == 'true') return;
            //
            //     $scope._rating = 0;
            //     $scope.hoverValue = param;
            //     $scope.mouseHover({
            //         param: param
            //     });
            // };
            //
            // $scope.isolatedMouseLeave = function (param) {
            //     if ($scope.readOnly == 'true') return;
            //
            //     $scope._rating = $scope.rating;
            //     $scope.hoverValue = 0;
            //     $scope.mouseLeave({
            //         param: param
            //     });
            // };


        }
    };
});