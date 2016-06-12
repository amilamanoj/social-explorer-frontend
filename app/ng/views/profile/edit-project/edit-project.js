'use strict';

angular.module('myApp.profile')

    .constant('profileEditProjState', {
        name: 'profile.editproj',
        options: {


            url: '/edit-project/{projectId}',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/profile/edit-project/edit-project.html',
                   // params:      {'project': null},
                    controller: 'ProfileEditProjCtrl'
                }
                //     // 'outside@root': {
                //     //     templateUrl: 'views/list/project-list-buttons.html',
                //     //     controller: 'projectListButtonCtrl'
                //     // }
            },



            ncyBreadcrumb: {
                label: "Edit Project",
                parent: "profile"
            }

        }

    })

    .controller('ProfileEditProjCtrl', function($state, $scope, $rootScope, $mdToast, $stateParams, Project, currUser) {

     //   $scope.saveProject = saveProject;
        $scope.cancel = cancel;
        //var project= $stateParams;
        //console.log("hello", project);
        $scope.project = Project.get({projectId: $stateParams.projectId});
        

        /*function saveProject(){
          console.log("edit project");
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
        } */

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

