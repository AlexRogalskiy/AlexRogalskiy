'use strict';

// configuration properties
export const CONFIG_PROPS = {
  locale: 'en-GB',
  short_date_format: {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Moscow',
  },
  long_date_format: {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Moscow',
  },
  filename: 'README.md',
  directions: ['north', 'north-west', 'west', 'south-west', 'south', 'south-east', 'east', 'north-east'],
};

// service properties
export const SERVICE_PROPS = {
  INSTAGRAM: {
    number: 4,
    tag: 'visitpetersburg',
    view: './src/views/instagram.mustache',
    placeholder: /<!--views:instagram-marker:start-->[\s\S]*?<!--views:instagram-marker:end-->/gm,
    replacer: value =>
      '<!--views:instagram-marker:start-->\n' + value + '\n<!--views:instagram-marker:end-->',
  },
  PINTEREST: {
    number: 4,
    tag: 'word-of-the-day',
    view: './src/views/pinterest.mustache',
    placeholder: /<!--views:pinterest-marker:start-->[\s\S]*?<!--views:pinterest-marker:end-->/gm,
    replacer: value =>
      '<!--views:pinterest-marker:start-->\n' + value + '\n<!--views:pinterest-marker:end-->',
  },
  WEATHER: {
    tag: 'Saint%20Petersburg',
    view: './src/views/weather.mustache',
    placeholder: /<!--views:weather-marker:start-->[\s\S]*?<!--views:weather-marker:end-->/gm,
    replacer: value => '<!--views:weather-marker:start-->\n' + value + '\n<!--views:weather-marker:end-->',
  },
};
