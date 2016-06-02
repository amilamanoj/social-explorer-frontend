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

    .controller('ProfileCreateProjCtrl', function($state, $scope, $rootScope, Project, currUser) {

        $scope.saveProject = saveProject;
        $scope.cancel = cancel;

        function saveProject(){
            console.log("create project");
            $scope.newProject = new Project();
            $scope.newProject.user = currUser.getUser()._id;
            $scope.newProject.title = this.project.title;
            $scope.newProject.objective = this.project.objective;
            $scope.newProject.description = this.project.description;
            $scope.newProject.from = this.project.fromDate;
            $scope.newProject.to = this.project.toDate;

            console.log($scope.newProject);

            $scope.newProject.$save()
                .then(function(){
                    $rootScope.$broadcast('projectCreated', $scope.newProject);
                }).catch(function(e){
                console.log("error: " + e)
            });
        }

        function cancel(){
            $state.go('profile.overview')
        }



    });

