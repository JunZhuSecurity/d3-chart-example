var chart = angular.module('chart', [
  'ngRoute',
  'controllers',
  'hashBangURLs',
  'startSymbol',
  'ngSanitize',
  'ui.bootstrap',
  'ui.chart'
]);

chart.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/pie', {
        templateUrl: 'pie',
        controller: 'PieController'
    });

    $routeProvider.when('/tree', {
        templateUrl: 'tree',
        controller: 'TreeController'
    });

    $routeProvider.when('/bubble', {
        templateUrl: 'bubble',
        controller: 'BubbleController'
    });
    
    $routeProvider.when('/home', {
        templateUrl: 'home',
        controller: 'HomeController'
    });

    $routeProvider.otherwise({
        redirectTo: '/home'
    });

}]);

chart.run(function($rootScope, $http) {
    
    $rootScope.isLoggingEnabled = true;

    $rootScope.go = function(path) {
    	window.top.location = path;
    };

    $rootScope.log = function(value, json) {
        if($rootScope.isLoggingEnabled) {
            if(json) {
                if(typeof(value) == String) {
                    value = JSON.parse(value);
                }
            } else {
                if(typeof(value) == Object) {
                    value = JSON.stringify(value);
                }
            }
            console.log(value);
        }
    };

    $rootScope.toTitleCase = function(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

});

var controllers = angular.module('controllers', []);
var startSymbol = angular.module('startSymbol', []).config(['$interpolateProvider', function($interpolateProvider){
        $interpolateProvider.startSymbol('{[').endSymbol(']}');
}]);
var hashBangURLs = angular.module('hashBangURLs', []).config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);