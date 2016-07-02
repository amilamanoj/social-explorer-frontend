'use strict';

angular.module('myApp.profile')

    .constant('profileOverviewState', {
        name: 'profile.overview',
        options: {


            url: '/overview',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/profile/overview/profile-overview.html',
                    controller: 'ProfileOverviewCtrl'
                }
            //     // 'outside@root': {
            //     //     templateUrl: 'views/list/project-list-buttons.html',
            //     //     controller: 'projectListButtonCtrl'
            //     // }
            },

            ncyBreadcrumb: {
                label: "Overview",
                parent: "profile"
            }

        }

    })

    .controller('ProfileOverviewCtrl', function($scope, share, $state, Profile, Rating, $mdDialog, $stateParams, currUser, Project) {

        $scope.loading = true;
        $scope.projects = Project.query(function() {
            $scope.loading = false;
        });

        $scope.user=Profile.get({userId:currUser.getUser()._id});

        $scope.ratings = Rating.query({ratedUser:currUser.getUser()._id}, function () {
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
            if (typeof $scope.ratings[0]!='undefined') {
                $scope.$watch('starRating', function () {
                    share.rating = $scope.ratings[0].rateAvg;
                });
            }
        });

        $scope.ratingDialog = function(ev) {
            $mdDialog.show({

                templateUrl: 'views/profile/ratings-all-own.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
        };

        $scope.goToCreateProject = goToCreateProject;

        function goToCreateProject(){
            console.log("going to create project");
            $state.go('profile.createproj')
        }

        $scope.userFilter = function (project) {
            var projectUser = project.user;
            var loggedInUser = currUser.getUser();
            if (projectUser && loggedInUser) {
                return projectUser === loggedInUser._id;
            } else {
                return false;
            }
        };

        $scope.confirmAndDelete = function(ev, proj) {
            var confirm = $mdDialog.confirm()
                .title("Delete the project?")
                .textContent('Your project: "' + proj.title + '" will be deleted.')
                .ariaLabel('Delete?')
                .targetEvent(ev)
                .ok('Delete project')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                proj.$delete();
            }, function() {
                $scope.status = 'Canceled.';
            });
        };

        $scope.goToManageProject = function goToManageProject(proj){
            console.log("going to project manage");
            $state.go('profile.manageProject', {'projectId': proj._id });
        };

        $scope.edit = function (ev, proj){
            $state.go('profile.editproj',{project: proj});
        };


        $scope.goToProject=function (proj){
            console.log("going to project");
            $state.go('projects.detail', {'projectId': proj._id });
        };


        $scope.lookAtUser = function(ev) {



                $mdDialog.show({

                    templateUrl: 'views/profile/profile-details.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true

                })
            }
        

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        


    });

app.factory('share', function() {
    var obj = {
        rating: 0
    }
    return obj;
});

app.directive('starRating3', function () {
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