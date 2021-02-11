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

async function runInstagramFlow() {
  const MODEL_DATA = {
    refresh_date: formatDateByLongPattern(new Date()),
  };

  async function updateInstagramPosts() {
    const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount(
      SERVICE_PROPS.INSTAGRAM.tag,
      SERVICE_PROPS.INSTAGRAM.number
    );
    for (let i = 1; i <= instagramImages.length; i++) {
      MODEL_DATA[`img${i}_src`] = instagramImages[i - 1][0].src;
      MODEL_DATA[`img${i}_alt`] = instagramImages[i - 1][0].alt.replace(/(?:\r\n|\r|\n)/g, ' ');
    }
  }

  async function updateInstagramView() {
    await renderView(
      SERVICE_PROPS.INSTAGRAM.view,
      CONFIG_PROPS.filename,
      MODEL_DATA,
      SERVICE_PROPS.INSTAGRAM.placeholder,
      SERVICE_PROPS.INSTAGRAM.replacer
    );
  }

  /**
   * Getting Instagram posted pictures
   */
  await updateInstagramPosts();
  /**
   * Generating README Instagram block by mustache template
   */
  await updateInstagramView();
}

module.exports = runInstagramFlow;
