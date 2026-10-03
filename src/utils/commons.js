'use strict';

// general
import Mustache from 'mustache';

import fs from 'fs';

import replace from 'replace-in-file';
// constants
import {CONFIG_PROPS} from '../configs/constants.js';

/**
 * Returns formatted side direction by input angle in degrees
 * @param angle initial input angle in degrees to calculate by
 * @returns {string} formatted side direction
 */
export const formatSideDirection = angle => {
  return CONFIG_PROPS.directions[Math.round(( ( angle %= 360 ) < 0 ? angle + 360 : angle ) / 45) % 8];
};

/**
 * Returns formatted date by input date/time pattern
 * @param value initial input date to format
 * @returns {string} short formatted date
 */
export const formatDateByShortPattern = value => {
  return new Date(value * 1000).toLocaleString(CONFIG_PROPS.locale, CONFIG_PROPS.short_date_format);
};

/**
 * Returns formatted date by input date/time pattern
 * @param value initial input date to format
 * @returns {string} long formatted date
 */
export const formatDateByLongPattern = value => {
  return new Date(value).toLocaleDateString(CONFIG_PROPS.locale, CONFIG_PROPS.long_date_format);
};

export const renderView = async (source, target, model, from, to) => {
  await fs.readFile(source, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), model);
    const options = {
      allowEmptyPaths: true,
      disableGlobs: true,
      files: target,
      from: from,
      to: to(output),
    };
    replaceContent(options);
  });
};

export const replaceContent = async options => {
  try {
    const results = await replace(options);
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};
