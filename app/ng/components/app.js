'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ui.router', 'myApp.projects', 'myApp.profile', 'myApp.applications','myApp.rating', 'myApp.countries',
    'templates', 'ncy-angular-breadcrumb', 'ngMaterial', 'ngMessages','angular-carousel', 'naif.base64'])

    .config(function($stateProvider, $urlRouterProvider, $mdIconProvider, $resourceProvider, $httpProvider, $breadcrumbProvider, $mdThemingProvider) {

        // For any unmatched url, redirect to /projects
        $urlRouterProvider.otherwise("/home");


        $stateProvider
            .state('root', {

                abstract: true,
                templateUrl: "views/root/root.html",
                ncyBreadcrumb: {
                    label: "Home"
                }
            });

        $mdIconProvider
            .iconSet('content', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg')
            .iconSet('action', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg')
            .iconSet('editor', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg')
            .iconSet('social', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg')
            .iconSet('maps', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-maps.svg')
            .iconSet('navigation', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg')
            .iconSet('image', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg')
            .iconSet('communication', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg');


        //this overrides the defaults actiosn for all $resources
        angular.extend($resourceProvider.defaults.actions, {

            update: {
                method: "PUT"
            }

        });

        $httpProvider.interceptors.push('reqErrInterceptor');
        //auth interceptor
        $httpProvider.interceptors.push('authInterceptor');

        $breadcrumbProvider.setOptions({
            templateUrl:"components/breadcrumbs/breadcrumbs.html",
            includeAbstract : true
        });

        // color and theme of the toolbar
        $mdThemingProvider.theme('default')
            .primaryPalette('deep-orange')
            .accentPalette('amber')

    });

app.run(function ($rootScope, $state, $location, auth) {

    $rootScope.$on('$stateChangeStart', function (event, toState) {

        var shouldLogin = toState.data !== undefined
            && toState.data.requireLogin
            && !auth.isAuthed() ;

        // NOT authenticated - redrect to home
        if(shouldLogin)
        {
            event.preventDefault();
            console.log("Not logged in, redirecting to home");
            $state.go('projects.list');
            return;
        }

        // if (!angular.isFunction(toState.data.rule)) return;
        // var result = toState.data.rule($currentUser);
        //
        // if (result && result.to) {
        //     e.preventDefault();
        //     // Optionally set option.notify to false if you don't want
        //     // to retrigger another $stateChangeStart event
        //     $state.go(result.to, result.params, {notify: false});
        // }
    
        // unmanaged
    });
});
