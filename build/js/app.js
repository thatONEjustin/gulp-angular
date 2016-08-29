var app = angular.module('portfolio-site', ['ngRoute']);

app.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl : 'pages/home.html',
      controller: 'HomeController',
      activetab: 'home'
    })
    .when('/about', {
      templateUrl: 'pages/about.html',
      controller: 'AboutController',
      activetab: 'about'
    })
    .when('/blog', {
      templateUrl: 'pages/blog.html',
      controller: 'BlogController',
      activetab: 'blog'
    })
    .when('/portfolio', {
      templateUrl: 'pages/portfolio.html',
      controller: 'PortfolioController',
      activetab: 'portfolio'
    })
    .when('/contact', {
      templateUrl: 'pages/contact.html',
      controller: 'ContactController',
      activetab: 'contact'
    })
    .otherwise({ redirectTo: '/' });

    //$locationProvider.html5Mode(true);

}]).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {

    $scope.$on("$routeChangeSuccess", function (scope, next, current) {
        $scope.activePage = $route.current.activetab;
    });
    
}]);

app.controller('MainController', function ($scope, $route) {
    //$scope.message = 'Hi, I\'m Justin';
        
    try {
        Typekit.load({ async: true });

        $scope.$on("$routeChangeSuccess", function (scope, next, current) {
            $scope.activePage = $route.current.activetab;
        });
        
        //console.log($scope);

    } catch (err) {
        console.log(err);
    }

    
    
});

app.controller('MainMenu', function ($scope) {

    var $menuOpen = $('.mobile-menu-icon');
    var $menu = $('#main-menu');
    var $mobileMenu = $('#mobile-menu');
    var $viewport = $('.viewport');
    var $mask = $('.mask');
    var closeMobile = '.menu-close, #main-menu ul li a';

    $menuOpen.bind('click', function(e) {
        e.preventDefault();

        $menu.addClass('is-active');
        $viewport.addClass('menu-is-active');
        $mask.addClass('is-active');
        $('.menu-close').addClass('show');
    });

    $(closeMobile).bind('click', function (e) {
        //e.preventDefault();
        //console.log(e.currentTarget);

        $menu.removeClass('is-active');
        $viewport.removeClass('menu-is-active');
        $mask.removeClass('is-active');
        $('.menu-close').removeClass('show');
    });
   
});