'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "lolapisample-secret",
  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  LOL_API_SECRET: '5da85be7-ba9d-409b-be32-ccfc222dcaba',
};
