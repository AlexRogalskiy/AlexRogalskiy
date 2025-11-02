'use strict';

// configurations
import {globalAgent} from 'https';

import {create} from 'ssl-root-cas';

// vendors
import fetch from 'node-fetch';

// constants
import {CONFIG_PROPS, SERVICE_PROPS} from '../configs/constants.js';

// services
import {
  formatDateByLongPattern,
  formatDateByShortPattern,
  formatSideDirection, renderView
} from '../utils/commons.js';

globalAgent.options.ca = create();

export async function runWeatherFlow() {
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
