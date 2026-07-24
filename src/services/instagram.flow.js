'use strict';

// services
import {puppeteerService} from './puppeteer.service.js';
import {formatDateByLongPattern, renderView} from '../utils/commons.js';

// constants
import {CONFIG_PROPS, SERVICE_PROPS} from '../configs/constants.js';

export async function runInstagramFlow() {
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
      MODEL_DATA[`img${i}_alt`] = instagramImages[i - 1][0].alt.replace(/\r\n|\r|\n/g, ' ');
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
