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
require('https').globalAgent.options.ca = require('ssl-root-cas').create();

// vendors
const fetch = require('node-fetch');
// services
const {
  formatSideDirection,
  formatDateByShortPattern,
  formatDateByLongPattern,
  renderView,
} = require('../utils/commons');
// constants
const { CONFIG_PROPS, SERVICE_PROPS } = require('../configs/constants');

async function runWeatherFlow() {
  const MODEL_DATA = {
    refresh_date: formatDateByLongPattern(new Date()),
  };

  async function updateWeatherPosts() {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${SERVICE_PROPS.WEATHER.tag}&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
    )
      .then(r => r.json())
      .then(r => {
        MODEL_DATA.temperature = Math.round(r.main.temp);
        MODEL_DATA.pressure = Math.round(r.main.pressure);
        MODEL_DATA.humidity = Math.round(r.main.humidity);

        MODEL_DATA.clouds = Math.round(r.clouds.all);
        MODEL_DATA.wind = Math.round(r.wind.speed);
        MODEL_DATA.wind_direction = formatSideDirection(r.wind.deg);

        MODEL_DATA.weather = r.weather[0].description;
        MODEL_DATA.weather_icon = r.weather[0].icon;

        MODEL_DATA.sunrise = formatDateByShortPattern(r.sys.sunrise);
        MODEL_DATA.sunset = formatDateByShortPattern(r.sys.sunset);
      });
  }

  async function updateWeatherView() {
    await renderView(
      SERVICE_PROPS.WEATHER.view,
      CONFIG_PROPS.filename,
      MODEL_DATA,
      SERVICE_PROPS.WEATHER.placeholder,
      SERVICE_PROPS.WEATHER.replacer
    );
  }

  /**
   * Fetching weather data
   */
  await updateWeatherPosts();
  /**
   * Generating README Weather block by mustache template
   */
  await updateWeatherView();
}

module.exports = runWeatherFlow;
