'use strict';

angular.module('myApp.projects')

    .constant('projectListState', {
        name: 'projects.list',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/projects' (because '/projects' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@root': {
                    templateUrl: 'views/list/project-list.html',
                    controller: 'ProjectListCtrl'
                }
                // 'outside@root': {
                //     templateUrl: 'views/list/project-list-buttons.html',
                //     controller: 'projectListButtonCtrl'
                // }
            },

            ncyBreadcrumb: {
                label: "Projects",
                parent: "root"
            }

        }

    })

    .controller('ProjectListCtrl', function($scope, Project) {
        $scope.projects = Project.query();

        $scope.$on('projectCreated', function(ev, project){
            $scope.projects.push(project);
        });


    });

    // .controller('projectListButtonCtrl', function($scope, $mdMedia, $mdDialog, $mdToast, currUser){
    //
    //     $scope.createProjectDialog = createProjectDialog;
    //     $scope.authed = false;
    //
    //     $scope.$watch(function(){
    //         return currUser.loggedIn();
    //     }, function(loggedIn){
    //         $scope.authed = loggedIn;
    //     });
    //
    //     ////////////////////////////////////
    //
    //     function createProjectDialog(ev) {
    //         var useFullScreen = ( $mdMedia('xs'));
    //         $mdDialog.show({
    //                 controller: "CreateProjectCtrl",
    //                 templateUrl: 'components/create-project/create-project.html',
    //                 targetEvent: ev,
    //                 clickOutsideToClose:true,
    //                 fullscreen: useFullScreen,
    //                 preserveScope:true
    //             })
    //             .then(function(answer) {
    //
    //                 if (answer) {
    //                     showSimpleToast('Project saved successfully');
    //                 } else {
    //                     showSimpleToast('An Error occured!');
    //                 }
    //             }, function() {
    //                 showSimpleToast('Project creation cancelled');
    //             });
    //
    //     }
    //
    //     function showSimpleToast(txt){
    //         $mdToast.show(
    //             $mdToast.simple()
    //                 .textContent(txt)
    //                 .position('bottom right')
    //                 .hideDelay(3000)
    //
    //         );
    //     }
    // });