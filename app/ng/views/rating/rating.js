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
                    templateUrl: 'views/rating/rating-write.html',
                    controller: 'ProfileRatingCtrl'
                }

            },

            ncyBreadcrumb: {
                label: "rating",
                parent: "profile"
            }

        }

    })

app.controller('ProfileRatingCtrl', function($scope, $state, Profile, Project, $mdMedia, $mdDialog, currUser, Rating, $stateParams) {


    $scope.loading = true;
    $scope.ratings = Rating.query({createdUser:currUser.getUser()._id}  , function() {
        $scope.loading = false;
        $scope.$parent.selectedIndex=1;
        var varIndex;

        for (varIndex = 0; varIndex < $scope.ratings.length; ++varIndex) {
            var appl =  $scope.ratings[varIndex];
            Project.get({projectId:appl.project}, function (proj)  {
                var result = $scope.ratings.filter(function( obj ) {
                    return obj.project == proj._id;
                });
                result[0].pTitle = proj.title;
            });

        }

        for (varIndex = 0; varIndex < $scope.ratings.length; ++varIndex) {
            var user =  $scope.ratings[varIndex];
            Profile.get({userId:user.createdUser}, function (userr)  {
                var result = $scope.ratings.filter(function( obj ) {
                    return obj.createdUser == userr._id;
                });
                result[0].cUser = userr.username;
            });

        }


    });
    console.log(currUser.getUser());
    console.log($scope.ratings);


    $scope.ratingDialog = function(ev) {


            $mdDialog.show({

                    templateUrl: 'views/profile/ratings-all.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })


    };
    // $scope.ratings = Rating.query();
    //
    // console.log($scope.ratings );
    // console.log(currUser.getUser()._id);
    //
    // $scope.rating =Rating.get({ratedUser: currUser.getUser()._id});

    //console.log($scope.rating );
    //$scope.project = Project.get({projectId: $stateParams.projectId});


    $scope.starRating1 = 4;
    $scope.starRating2 = 5;


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

    // $scope.click3 = function (param) {
    //     console.log('Click');
    // };
    //
    // $scope.mouseHover3 = function (param) {
    //     console.log('mouseHover(' + param + ')');
    //     $scope.hoverRating3 = param;
    // };
    //
    // $scope.mouseLeave3 = function (param) {
    //     console.log('mouseLeave(' + param + ')');
    //     $scope.hoverRating3 = param + '*';
    // };
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