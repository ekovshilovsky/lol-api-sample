'use strict';

var express = require('express');
var controller = require('./summoner.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', controller.show);

module.exports = router;
