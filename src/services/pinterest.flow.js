'use strict';

// services
import {puppeteerService} from './puppeteer.service.js';
import {formatDateByLongPattern, renderView} from '../utils/commons.js';

// constants
import {CONFIG_PROPS, SERVICE_PROPS} from '../configs/constants.js';

export async function runPinterestFlow() {
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
