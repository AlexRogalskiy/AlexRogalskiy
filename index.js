'use strict';

// configurations
require('dotenv').config();
require('https').globalAgent.options.ca = require('ssl-root-cas').create();

// services
const puppeteerService = require('./src/services/puppeteer.service');
const runWeatherFlow = require('./src/services/weather.flow');
const runInstagramFlow = require('./src/services/instagram.flow');
const runPinterestFlow = require('./src/services/pinterest.flow');

async function runWorkflows() {
  /**
   * Running Weather flow
   */
  await runWeatherFlow();
  /**
   * Running Instagram flow
   */
  await runInstagramFlow();
  /**
   * Running Pinterest flow
   */
  await runPinterestFlow();
  /**
   * Destructuring puppeteer service
   */
  await puppeteerService.close();
}

runWorkflows();
