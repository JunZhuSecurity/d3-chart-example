'use strict';

controllers.controller('PieController', ['$scope', '$route', '$http', '$rootScope', '$routeParams', '$window', '$location', function PieController($scope, $route, $http, $rootScope, $routeParams, $window, $location) {

    $scope.tweets = [];
    $scope.hashtag = "";

    $scope.doesGroupExist = function(tweetGroups, group) {
        for(var j=0; j<tweetGroups.length; j++) {
            if(tweetGroups[j].country == group) {
                return true;
            }
        }
        return false;
    };

    $scope.addGroup = function(tweetGroups, group) {
        tweetGroups.push({
            country: group,
            count: 1
        });
    };

    $scope.incrementGroup = function(tweetGroups, group) {
        for(var j=0; j<tweetGroups.length; j++) {
            if(tweetGroups[j].country == group) {
                tweetGroups[j].count++;
            }
        }
    };

    $scope.getTweets = function() {

        $scope.tweets = [];

        $('#pie-chart').hide();
        $('.tweets-table').hide();

        var hashtag = "";
        if($scope.hashtag == "") {
            hashtag = "football";
        } else {
            hashtag = $scope.hashtag.replace(/#/g, '');
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

            var tweetGroups = [];

            for(var i=0; i<$scope.tweets.length; i++) {
                var result = $scope.doesGroupExist(tweetGroups, $scope.tweets[i].user.time_zone);
                if(!result) {
                    $scope.addGroup(tweetGroups, $scope.tweets[i].user.time_zone);
                } else {
                    $scope.incrementGroup(tweetGroups, $scope.tweets[i].user.time_zone);
                }
            }

            var data = [];

            for(var x=0; x<tweetGroups.length; x++) {
                data.push([tweetGroups[x].country, tweetGroups[x].count]);
            }

            $('#pie-chart').fadeIn(400);
            $('.tweets-table').fadeIn(400);

            $.jqplot ('pie-chart', [data],
                {
                    height:400,
                    seriesDefaults: {
                        renderer: $.jqplot.PieRenderer,
                        rendererOptions: {
                            showDataLabels: true
                        }
                    },
                    grid: {
                        background: "#F9F9F9",
                        borderColor:"#CCCCCC",
                        borderWidth:1,
                        shadow:false
                    },
                    legend: { show:true, location: 'e' },
                    seriesColors: ["#F7977A", "#F9AD81", "#FDC68A", "#FFF79A", "#C4DF9B", "#A2D39C", "#82CA9D", "#7BCDC8", "#6ECFF6", "#7EA7D8", "#8493CA", "#8882BE", "#A187BE", "#BC8DBF", "#F49AC2", "#F6989D"]
                }
            ).replot();

            console.log($scope.tweets);

        }).error(function (data, status, headers, config) {

        	console.error("Error occurred during HTTP request!");

        });

    };

    $scope.getTweets();

}]);