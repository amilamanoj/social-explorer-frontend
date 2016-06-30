'use strict';

angular.module('myApp.profile')

    .constant('profileCreateProjState', {
        name: 'profile.createproj',
        options: {


            url: '/new-project',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/profile/new-project/new-project.html',
                    controller: 'ProfileCreateProjCtrl'
                }
            //     // 'outside@root': {
            //     //     templateUrl: 'views/list/project-list-buttons.html',
            //     //     controller: 'projectListButtonCtrl'
            //     // }
            },

            ncyBreadcrumb: {
                label: "Create Project",
                parent: "profile"
            }

        }

    })

    .controller('ProfileCreateProjCtrl', function($state, $scope, $rootScope, $mdToast, Project, currUser) {

        $scope.saveProject = saveProject;
        $scope.cancel = cancel;
        
        function saveProject(){
            console.log("create project");
            $scope.newProject = new Project();
            $scope.newProject.user = currUser.getUser()._id;
            $scope.newProject.title = this.project.title;
            $scope.newProject.country = this.project.country;
            $scope.newProject.city = this.project.city;
            $scope.newProject.objective = this.project.objective;
            $scope.newProject.description = this.project.description;
            $scope.newProject.fromDate = this.project.fromDate;
            $scope.newProject.toDate = this.project.toDate;
            $scope.newProject.img = this.project.image.base64;

            console.log($scope.newProject);

            $scope.newProject.$save()
                .then(function(){
                    $rootScope.$broadcast('projectCreated', $scope.newProject);
                    $state.go('profile.overview');
                    showSimpleToast("Project created!")
                }).catch(function(e){
                console.log("error: " + e);
                showSimpleToast("Project creation failed: " + e);

            });
        }

        function cancel(){
            $state.go('profile.overview')
        }

        function showSimpleToast(txt){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(txt)
                        .position('bottom right')
                        .hideDelay(3000)

                );
            }


    });

