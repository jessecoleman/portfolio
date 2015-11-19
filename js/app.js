//Angular ui-router
var app = angular.module('app', ['firebase', 'ui.router'])
//configure pages
    .config(function($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html',
            controller: 'AuracleController'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'templates/contact.html',
            controller: 'AuracleController'
        })
        .state('auracle', {
            url: '/auracle',
            templateUrl: 'templates/project-view.html',
            controller: 'AuracleController'
        })
        .state('welp', {
            url: '/welp',
            templateUrl: 'templates/project-view.html',
            controller: 'WelpController'
        });
    })
    .controller('mainCtrl', function($scope, $firebaseArray) {
        var ref = new Firebase("https://jesse-chamberlin-portfolio.firebaseio.com");
        var projectsRef = ref.child('projects');
        $scope.projects = $firebaseArray(projectsRef).$loaded(function(d) {
            console.log(d);
        });
    })
    .controller('HomeController', function($scope) {

    })
    .controller('AuracleController', function($scope) {

    })
    .controller('WelpController', function($scope) {

});