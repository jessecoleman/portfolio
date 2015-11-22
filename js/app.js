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
    })
    .state('auracle', {
        url: '/projects/auracle',
        templateUrl: 'templates/project-view.html',
        controller: 'projectViewCtrl'
    })
    .state('spotify', {
        url: '/projects/spotify',
        templateUrl: 'templates/project-view.html',
        controller: 'projectViewCtrl'
    })
    .state('stickers', {
        url: '/projects/stickers',
        templateUrl: 'templates/project-view.html',
        controller: 'projectViewCtrl'
    })
    .state('uiuxcontest', {
        url: '/projects/uiuxcontest',
        templateUrl: 'templates/project-view.html',
        controller: 'projectViewCtrl'
    })
    .state('welp', {
        url: '/projects/welp',
        templateUrl: 'templates/project-view.html',
        controller: 'projectViewCtrl'
    })
})
.controller('mainCtrl', function($scope, $filter, $firebaseArray, $state) {
    $scope.getSmall = function() {
        return $('#content').css('margin') === '36px';
    };

    //check css on element styled with media-queries instead of relying on $().width, fixes wrong width due to scrollbar
    var resize = function() {
        if ($scope.getSmall()) {
            $('paper-header-panel[main]').prop('mode', 'seamed');
            $('paper-toolbar').removeClass('tall');
        } else {
            $('paper-header-panel[main]').prop('mode', 'cover');
            $('paper-toolbar').addClass('tall');
        }
    };

    $(window).resize(resize);

    // handle redirects when clicking elements of nav drawer
    $scope.projects = $firebaseArray(projectsRef);
    $scope.redirect = function(url) {
        if($state.is('home')) {
            $state.go(url);
        } else {
            $state.go('^.' + url);
        }
    };

    $scope.pressFab = function(url) {
        window.location.replace(url);
    };

    $scope.goHome = function() {
        if(!$state.is('home')) {
            $state.go('home');
        }
    };

    //when page is loaded, resize and go to home
    $(document).ready(function() {
        $scope.goHome();
        resize();
    })
})
.controller('homeCtrl', function($scope, $firebaseArray) {
    var aboutRef = ref.child('about');
    $scope.about = $firebaseArray(aboutRef);

    var contactRef = aboutRef.child('contact');
    $scope.contact = $firebaseArray(contactRef);

    var positionFabs = function() {
        var offset = 56;
        if($scope.getSmall()) {
            offset = 32;
        }

        $('paper-fab[mini]').each(function (index) {
            $(this).css('bottom', (index + 1) * 56 + offset + 12);
            $(this).css('right', offset);
        })
    };

    positionFabs();
    $(window).resize(positionFabs);
})
.controller('projectViewCtrl', function($scope, $state, $firebaseObject) {

    var stateData = projectsRef.child($state.current.name);
    $scope.project = $firebaseObject(stateData);

    $scope.pressFab = function() {
        window.location.replace($scope.project.url);
    }
});