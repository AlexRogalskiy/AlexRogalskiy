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

const puppeteer = require('puppeteer');

class PuppeteerService {
  #browser;
  #page;

  async init() {
    this.#browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--incognito',
        '--proxy-server=http=194.67.37.90:3128',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
      ],
      headless: true,
    });
  }

  async goToPage(url) {
    if (!this.#browser) {
      await this.init();
    }
    this.#page = await this.#browser.newPage();

    await this.#page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US',
    });

    await this.#page.goto(url, {
      waitUntil: 'networkidle0',
    });
  }

  async close() {
    await this.#page.close();
    await this.#browser.close();
  }

  /**
   * Returns latest posts from Instagram
   * @param {string} acc Account to crawl
   * @param {number} num Qty of image to fetch
   */
  async getLatestInstagramPostsFromAccount(acc, num) {
    const page = `https://www.picuki.com/profile/${acc}`;
    await this.goToPage(page);

    try {
      let previousHeight = await this.#page.evaluate('document.body.scrollHeight');
      await this.#page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await this.#page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);

      const nodes = await this.#page.evaluate(() => {
        const images = document.querySelectorAll('.post-image');
        return [].map.call(images, img => [{ src: img.src, alt: img.alt }]);
      });

      return nodes.slice(0, num);
    } catch (error) {
      console.log('Error', error);
      process.exit();
    }
  }

  /**
   * Returns latest posts from Pinterest
   * @param {string} acc Account to crawl
   * @param {number} num Qty of image to fetch
   */
  async getLatestPinterestPostsFromAccount(acc, num) {
    const page = `https://www.pinterest.ru/dictionarycom/${acc}`;
    await this.goToPage(page);

    try {
      let previousHeight = await this.#page.evaluate('document.body.scrollHeight');
      await this.#page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await this.#page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);

      const nodes = await this.#page.evaluate(() => {
        const images = document.querySelectorAll('.GrowthUnauthPinImage__Image');
        return [].map.call(images, img => [{ src: img.src, alt: img.alt }]);
      });

      return nodes.slice(0, num);
    } catch (error) {
      console.log('Error', error);
      process.exit();
    }
  }
}

const puppeteerService = new PuppeteerService();

module.exports = puppeteerService;
