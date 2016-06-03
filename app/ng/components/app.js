'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'myApp.projects', 'myApp.profile', 'templates', 'ncy-angular-breadcrumb',
    'ngMaterial', 'ngMessages','angular-carousel', 'naif.base64'])

    .config(function($stateProvider, $urlRouterProvider, $mdIconProvider, $resourceProvider, $httpProvider, $breadcrumbProvider, $mdThemingProvider) {

        // For any unmatched url, redirect to /projects
        $urlRouterProvider.otherwise("/projects");


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
        .iconSet('image', 'libs/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg');


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
            .primaryPalette('amber')
            .accentPalette('green')

    });
