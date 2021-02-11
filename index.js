// Official GitHub profile page
// Copyright (C) 2021 Alexander Rogalskiy
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see https\\://www.gnu.org/licenses/.

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
