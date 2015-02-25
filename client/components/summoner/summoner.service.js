'use strict';

angular.module('lolApiSampleApp')
  .factory('Summoner', function Summoner($http, $q) {
    // Public API here
    return {
      getSummoner: function (summonerName, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/summoners/' + escape(summonerName)).
          success(function(data) {
            deferred.resolve(data);
            return cb(data);
          }).
          error(function(err, status) {
            err.status = status;
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      }
    };
  });
