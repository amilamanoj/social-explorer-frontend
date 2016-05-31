angular.module('myApp.profile', ['ngResource', 'ui.router'])
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });

        };
    })

.config(function ($stateProvider, $urlRouterProvider, profileOverviewState) {
    $stateProvider

        .state('profile', {

            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of its children.
            // abstract: true,
            parent: 'root',

            // This abstract state will prepend '/profile' onto the urls of all its children.
            url: '/profile',

            // since we have views we do not need to define a template here
            //template: '<div ui-view></div>',

            // Use `resolve` to resolve any asynchronous controller dependencies
            // *before* the controller is instantiated. In this case, since contacts
            // returns a promise, the controller will wait until contacts.all() is
            // resolved before instantiation. Non-promise return values are considered
            // to be resolved immediately.
            //resolve: {
            //    projects: ['contacts',
            //        function( contacts){
            //            return contacts.all();
            //        }]
            //},
            views: {
                'content@root': {
                    templateUrl: 'views/profile/profile.html',
                    controller: 'ProfileOverviewCtrl'
                }
                // 'outside@root': {
                //     templateUrl: 'views/list/project-list-buttons.html',
                //     controller: 'projectListButtonCtrl'
                // }
            },
            ncyBreadcrumb: {
                label: "Profile",
                parent: 'root'
            }

        })


        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'list' within the parent 'home' state.
        .state(profileOverviewState.name, profileOverviewState.options);

        // .state(profileAccountState.name, profileAccountState.options);

});





