'use strict';

controllers.controller('PieController', ['$scope', '$route', '$http', '$rootScope', '$routeParams', '$window', '$location', function PieController($scope, $route, $http, $rootScope, $routeParams, $window, $location) {

    $scope.tweets = [];
    $scope.hashtag = "";

    $scope.getTweets = function() {

        $scope.tweets = [];

        var hashtag = "";
        if($scope.hashtag == "") {
            hashtag = "football";
        } else {
            hashtag = $scope.hashtag;
        }

        $http({
	        url: 'api/get-tweets?hashtag='+hashtag,
	        method: "GET",
	        data: '',
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {

            $scope.tweets = data.statuses;

        }).error(function (data, status, headers, config) {

        	console.error("Error occurred during HTTP request!");

        });

    };

    $scope.data = [[
        ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14],
        ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
     ]];

    $scope.chartOptions = {
        seriesDefaults: {
          // Make this a pie chart.
          renderer: jQuery.jqplot.PieRenderer,
          rendererOptions: {
            // Put data labels on the pie slices.
            // By default, labels show the percentage of the slice.
            showDataLabels: true
          }
        },
        legend: { show:true, location: 'e' }
    };

    $scope.getTweets();

}]);