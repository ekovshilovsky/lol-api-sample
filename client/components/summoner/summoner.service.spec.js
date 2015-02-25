'use strict';

describe('Service: summoner', function () {

  // load the service's module
  beforeEach(module('lolApiSampleApp'));

  // instantiate service
  var summoner;
  beforeEach(inject(function (_summoner_) {
    summoner = _summoner_;
  }));

  it('should do something', function () {
    expect(!!summoner).toBe(true);
  });

});
