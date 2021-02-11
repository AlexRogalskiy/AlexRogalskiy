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

// services
const puppeteerService = require('./puppeteer.service');
const { formatDateByLongPattern, renderView } = require('../utils/commons');
// constants
const { CONFIG_PROPS, SERVICE_PROPS } = require('../configs/constants');

async function runPinterestFlow() {
  const MODEL_DATA = {
    refresh_date: formatDateByLongPattern(new Date()),
  };

  async function updatePinterestPosts() {
    const pinterestImages = await puppeteerService.getLatestPinterestPostsFromAccount(
      SERVICE_PROPS.PINTEREST.tag,
      SERVICE_PROPS.PINTEREST.number
    );
    for (let i = 1; i <= pinterestImages.length; i++) {
      MODEL_DATA[`img${i}_src`] = pinterestImages[i - 1][0].src;
      MODEL_DATA[`img${i}_alt`] = pinterestImages[i - 1][0].alt.replace(/(?:\r\n|\r|\n)/g, ' ');
    }
  }

  async function updatePinterestView() {
    await renderView(
      SERVICE_PROPS.PINTEREST.view,
      CONFIG_PROPS.filename,
      MODEL_DATA,
      SERVICE_PROPS.PINTEREST.placeholder,
      SERVICE_PROPS.PINTEREST.replacer
    );
  }

  /**
   * Getting Pinterest posted pictures
   */
  await updatePinterestPosts();
  /**
   * Generating README Pinterest block by mustache template
   */
  await updatePinterestView();
}

module.exports = runPinterestFlow;
