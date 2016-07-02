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
    .controller('ProjectDetailCtrl', function($scope, Profile, Project, Application,$mdMedia, shareDataService,$mdToast, $mdDialog, $stateParams, $state, currUser) {

        $scope.project = Project.get({projectId: $stateParams.projectId});

            $scope.mayDelete;
        $scope.mayEdit = currUser.loggedIn();
        $scope.deleteProject = deleteProject;
        $scope.updateProject = updateProject;
        $scope.cancelEditingProject = function(){ showSimpleToast("Editing cancelled"); }

        $scope.project.$promise.then(function(){
            $scope.mayDelete = $scope.project.user && $scope.project.user == currUser.getUser()._id;
            $scope.canApply = $scope.project.user && $scope.project.user != currUser.getUser()._id;
            Profile.get({userId: $scope.project.user}, function (pUser) {
                $scope.projectUser = pUser;
            });
            $scope.functionForInsert($scope.project.user);

            $scope.applications = Application.query({applicant:currUser.getUser()._id, project:$scope.project._id});
            $scope.applications.$promise.then(function(){
              
                $scope.alreadyApply = typeof $scope.applications[0]!='undefined';


            });
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
        
        $scope.goToApplication = function (ev){
            $state.go("profile.applications");
        }

        $scope.applyForProject = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app

            if(currUser.loggedIn()) {

                var confirm = $mdDialog.prompt()
                    .title('Participate in the project')
                    .textContent('Let the organizer know why do you want to participate in this event, in one sentence')
                    .placeholder('statement')
                    .ariaLabel('statement')
                    // .initialValue('your text there')
                    .targetEvent(ev)
                    .ok('Apply!')
                    .cancel('Cancel');
                $mdDialog.show(confirm).then(function (result) {
                    $scope.status = 'You applied with statement ' + result + '.';
                    sendApplication(result);
                }, function () {
                    $scope.status = 'You canceled.';
                });
            }
            else{
                    $mdDialog.show({

                        templateUrl: 'views/profile/dialog-not-logged.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                }
        };


        $scope.lookAtProfile = function(ev) {

            if(currUser.loggedIn()) {

                $mdDialog.show({

                        templateUrl: 'views/profile/profile-public.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true

                    })
            }

            else{
                $mdDialog.show({

                    templateUrl: 'views/profile/dialog-not-logged.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                })
            }
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
                    $state.go('profile.applications');
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
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.functionForInsert = function(test){
            shareDataService.addProduct(test);
        };


        function showSimpleToast(txt) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(txt)
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }

         $scope.showLoginDialog=function () {

            $mdDialog.show({
                controller: 'login',
                templateUrl: 'components/login-dialog/login-dialog.html',
                clickOutsideToClose:true,

           });
         }

         $scope.showSignupDialog=function(){

            $mdDialog.show({
                controller: 'register',
                templateUrl: 'components/register-dialog/register-dialog.html',
                clickOutsideToClose:true,

            });
        };


    });

app.service('shareDataService', function() {
    var productList = "";

    var addProduct = function(newObj) {
        productList = "";
        productList=newObj;
    };

    var getProducts = function(callback){
        return productList;
    };

    return {
        addProduct: addProduct,
        getProducts: getProducts
    };

});