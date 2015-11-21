//Angular ui-router
var app = angular.module('app', ['firebase', 'ui.router']);
    var ref = new Firebase("https://jesse-chamberlin-portfolio.firebaseio.com");
    var projectsRef = ref.child('projects');
    //configure pages
    app.config(function($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        });
    })
    .controller('mainCtrl', function($scope, $firebaseArray, $state) {
        $scope.projects = $firebaseArray(projectsRef);
        $scope.projects.$loaded(function(projects) {
            app.config(function($stateProvider) {
                projects.forEach(function(element) {
                    $stateProvider.state(element.$id, {
                        url: '/projects/' + element.$id,
                        templateUrl: 'templates/project-view.html',
                        controller: 'projectViewCtrl'
                    });
                });
            });
        });



        $scope.redirect = function(url) {
            console.log($state.current);
            if($state.current.url === "^") {
                console.log('up');
                $state.go(url);
            } else{
                $state.go(url);
            }
        };
    })
    .controller('homeCtrl', function($scope, $firebaseArray) {
        var aboutRef = ref.child('about');
        $scope.about = $firebaseArray(aboutRef);

    })
    .controller('projectViewCtrl', function($scope) {

    });