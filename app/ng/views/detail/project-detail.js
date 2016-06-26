'use strict';

angular.module('myApp.projects')

    .constant('projectDetailsState', {
        name: 'projects.detail',
        options: {
            url: '/{projectId}',

            views: {
                "content@root": {
                    templateUrl: 'views/detail/project-detail.html',
                    controller: 'ProjectDetailCtrl'
                }
            },

            resolve: {
                //we abuse the resolve feature for eventual redirection
                redirect: function($state, $stateParams, Project, $timeout, $q){
                    var mid = $stateParams.projectId;
                    if (!mid) {
                        //timeout because the transition cannot happen from here
                        $timeout(function(){
                            $state.go("projects.list");
                        });
                        return $q.reject();
                    }
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "{{$$childHead.$$childHead.project.title}}",
                parent: "projects.list"
            }

        }
    })
    .controller('ProjectDetailCtrl', function($scope, Profile, Project, Application, $mdToast, $mdDialog, $stateParams, $state, currUser) {

        $scope.project = Project.get({projectId: $stateParams.projectId});

       //$scope.user=Profile.get({userId:$scope.project.user}); Does work, I don´t konw why??

        $scope.mayDelete;
        $scope.mayEdit = currUser.loggedIn();
        $scope.deleteProject = deleteProject;
        $scope.updateProject = updateProject;
        $scope.cancelEditingProject = function(){ showSimpleToast("Editing cancelled"); }

        $scope.project.$promise.then(function(){
            $scope.mayDelete = $scope.project.user && $scope.project.user == currUser.getUser()._id;
        });

        $scope.project.$promise.then(function(){
            $scope.canApply = $scope.project.user && $scope.project.user != currUser.getUser()._id;
        });

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            if (!loggedIn) {
                $scope.mayDelete = false;
                $scope.mayEdit = false;
            } else {
                $scope.mayEdit = true;
                $scope.mayDelete = $scope.project.user == currUser.getUser()._id;
            }
        });

        ////////////////////

        $scope.applyForProject = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('Participate in the project')
                .textContent('Let the organizer know why do you want to participate in this event, in one sentence')
                .placeholder('statement')
                .ariaLabel('statement')
                // .initialValue('your text there')
                .targetEvent(ev)
                .ok('Apply!')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function(result) {
                $scope.status = 'You applied with statement ' + result + '.';
                sendApplication(result);
            }, function() {
                $scope.status = 'You canceled.';
            });
        };

        $scope.lookAtProfile = function(ev, user) { //just a preview example for a pop up window
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('Profile of host:')
                .textContent('Name: ')

                // .textContent('Name: "' + user.username + '"')
                .placeholder('statement')
                .ariaLabel('statement')
                // .initialValue('your text there')
                .targetEvent(ev)
                .ok('Apply!')
                 .cancel('Back');
            $mdDialog.show(confirm).then(function(result) {
                $scope.status = 'You applied with statement ' + result + '.';
                sendApplication(result);
            },
                function() {
                $scope.status = 'You canceled.';
            });
        };

        function sendApplication(statement){
            console.log("create application");
            $scope.newApplication = new Application();
            $scope.newApplication.applicant = currUser.getUser()._id;
            $scope.newApplication.user = currUser.getUser()._id;
            $scope.newApplication.host = $scope.project.user;
            $scope.newApplication.project = $scope.project._id;
            $scope.newApplication.createdDate = new Date();
            $scope.newApplication.statement = statement;

            console.log($scope.newApplication);

            $scope.newApplication.$save()
                .then(function(){
                    // $rootScope.$broadcast('applicationCreated', $scope.newApplication);
                    $state.go('profile.overview');
                    showSimpleToast("Application sent!")
                }).catch(function(e){
                console.log("error: " + e);
                showSimpleToast("Application sending failed: " + e);

            });
        }


        function updateProject(changed) {

            if (!changed) {
                showSimpleToast("no change");
                return;
            }

            $scope.project.$update().then(function(updated){
                $scope.project = updated;
                showSimpleToast("update successfull");
            }, function(){
                showSimpleToast("error. please try again later");
            });
        }

        function deleteProject(ev) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this project?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('Abort');

            var toastText;
            $mdDialog.show(confirm).then(function() {
                return $scope.project.$remove().then(function() {
                    return $state.go('projects.list');
                }).then(function(){
                    showSimpleToast('Project deleted successfully');
                }, function() {
                    showSimpleToast("Error. Try again later");
                });
            }, function() {
                showSimpleToast("delete aborted");
            })
        }

        function showSimpleToast(txt) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(txt)
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }


    });