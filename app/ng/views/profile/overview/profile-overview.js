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

    .controller('ProfileOverviewCtrl', function($scope, share, $state, Profile, Rating, $mdDialog, $stateParams, currUser, Project, Application) {

        $scope.loading = true;
        $scope.projects = Project.query({user:currUser.getUser()._id}, function() {
            var varIndex;

            for (varIndex = 0; varIndex < $scope.projects.length; ++varIndex) {
                var currProj =  $scope.projects[varIndex];
                Application.query({host:currUser.getUser()._id, project:currProj._id, status: 'PENDING'}, function(appl) {
                    var result = $scope.projects.filter(function( obj ) {
                        return appl[0] && obj._id == appl[0].project;
                    });
                    if (result[0]) {
                        result[0].pendingAppl = appl.length;
                    }
                });

            }
            $scope.loading = false;
        });
        $scope.user=Profile.get({userId:currUser.getUser()._id});

        //  get all ratings from the current user 
            $scope.ratings = Rating.query({ratedUser:currUser.getUser()._id}, function () {
                $scope.loading = false;
            });
            // when received the ratings, set the stars to the average of the ratings (only when there are ratings)
            $scope.ratings.$promise.then(function() {
                $scope.isRated = typeof $scope.ratings[0]=='undefined';
                // set str
                if (typeof $scope.ratings[0]!='undefined') {
                    $scope.$watch('starRating3', function () {
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