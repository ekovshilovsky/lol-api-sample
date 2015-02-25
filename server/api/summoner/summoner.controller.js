'use strict';

var _ = require('lodash');
var LolApi = require('leagueapi');
var config = require('../../config/environment');

LolApi.init(config.lol.secret);

// TODO: Add caching to the project so users can't bombard the API and make it timeout.

// Get list of summoners
exports.index = function(req, res) {
  res.json([]);
};

// Get a single thing
exports.show = function(req, res) {

  var summonerName = req.params.name.toLowerCase();
  console.log(summonerName);

  var responseData;

  LolApi.Summoner.getByName(summonerName, function (err, summonerData) {
    if(err) { return handleError(res, err); }
    if(!summonerData) { return res.send(404); }

    responseData = summonerData;
    console.log('\nRequested Data\n' + JSON.stringify(summonerData));
    var summonerId = summonerData[summonerName].id;

    LolApi.getRecentGames(summonerId, function (err, summonerData2) {
      if (err) {
        return handleError(res, err);
      }
      if (!summonerData2) {
        return res.send(404);
      }

      console.log('\nRequested Data 2\n' + JSON.stringify(summonerData2));
      responseData[summonerName]['games'] = _.map(summonerData2, function(currentObject) {
        _.merge(currentObject, _.pick(currentObject.stats, 'win'));
        currentObject.stats = undefined;
        return _.pick(currentObject, 'gameId', 'invalid', 'championId', 'win', 'stats', 'modifyDate');
      });
      //responseData[summonerName]['games'] = summonerData2;

      LolApi.Stats.getPlayerSummary(summonerId, null, function (err, summonerData3) {
        if (err) {
          return handleError(res, err);
        }
        if (!summonerData3) {
          return res.send(404);
        }

        console.log('\nRequested Data 3\n' + JSON.stringify(summonerData3));
        responseData[summonerName]['summary'] = _.map(summonerData3, function(currentObject) {
          currentObject.stats = undefined;
          return _.pick(currentObject, 'playerStatSummaryType', 'modifyDate', 'wins', 'losses');
        });
        //responseData[summonerName]['summary'] = summonerData3;

        console.log('\nResponse Data\n' + JSON.stringify(responseData));
        return res.json(responseData);
      });
    });

    console.log(JSON.stringify(err));


  });
};

function handleError(res, err) {
  return res.send(500, err);
}
