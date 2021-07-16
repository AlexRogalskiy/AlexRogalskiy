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
