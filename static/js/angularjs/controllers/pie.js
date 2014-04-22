'use strict';

controllers.controller('PieController', ['$scope', '$route', '$http', '$rootScope', '$routeParams', '$window', '$location', function PieController($scope, $route, $http, $rootScope, $routeParams, $window, $location) {

    $scope.tweets = [];
    $scope.hashtag = "";

    $scope.getTweets = function() {

        localStorage.setItem("tweets", null);

        $scope.tweets = [];

        var hashtag = "";
        if($scope.hashtag == "") {
            hashtag = "football";
        } else {
            hashtag = $scope.hashtag;
        }

        $http({
	        url: 'api/get-tweets?hashtag=' + hashtag,
	        method: "GET",
	        data: '',
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {

            for(var i=0; i<data.statuses.length; i++) {
                if(data.statuses[i].user.time_zone != null) {
                    $scope.tweets.push(data.statuses[i]);
                }
            }

            localStorage.setItem("tweets", JSON.stringify($scope.tweets));

            console.log($scope.tweets);

        }).error(function (data, status, headers, config) {

        	console.error("Error occurred during HTTP request!");

        });

    };

    $scope.getTweets();

}]);