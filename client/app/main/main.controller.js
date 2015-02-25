'use strict';

angular.module('lolApiSampleApp')
  .controller('MainCtrl', function ($scope, $http, Summoner) {
    $scope.awesomeThings = [];
    $scope.summoner = {};
    $scope.summonerGames = {};
    $scope.summonerSummary = {};

    $scope.errors = {};

    $scope.getSummoner = function(form) {
      $scope.submitted = true;
      console.log($scope.summonerName);

      Summoner.getSummoner($scope.summonerName)
        .then( function(data) {
          $scope.summoner = data;
          $scope.summonerGames = data[$scope.summonerName.toLowerCase()]['games'];
          $scope.summonerSummary = data[$scope.summonerName.toLowerCase()]['summary'];
        })
        .catch( function(err) {
          if (err.message)
            $scope.errors.other = err.message;
          else if (err.status == 500) {
            $scope.errors.other = 'Unable to retrieve Summoner summary';
          } else {
            $scope.errors.other = 'Unhandled error has occured';
          }
        });

    };
  });
