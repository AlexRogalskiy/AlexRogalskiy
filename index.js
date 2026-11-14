'use strict';

// configurations
import {config} from 'dotenv';
import {globalAgent} from 'https';

import {create} from 'ssl-root-cas';

config();
globalAgent.options.ca = create();

// services
import {puppeteerService} from './src/services/puppeteer.service.js';
import {runWeatherFlow} from './src/services/weather.flow.js';
import {runInstagramFlow} from './src/services/instagram.flow.js';
import {runPinterestFlow} from './src/services/pinterest.flow.js';

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
