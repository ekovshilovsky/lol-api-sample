'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/lolapisample-dev'
  },

  // League of Legends api settings
  lol: {
    secret: process.env.LOL_API_SECRET ||
    undefined
  },

  seedDB: true
};
