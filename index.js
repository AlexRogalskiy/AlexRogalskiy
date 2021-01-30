require('dotenv').config();
require('https').globalAgent.options.ca = require('ssl-root-cas').create();

const Mustache = require('mustache');
const fetch = require('node-fetch');
const fs = require('fs');
const puppeteerService = require('./services/puppeteer.service');
const replace = require('replace-in-file');

const MUSTACHE_MAIN_DIR = './views/photo-marker.view.mustache';

let DATA = {
    refresh_date: new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: 'Europe/Stockholm',
    }),
};

async function setWeatherInformation() {
    await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Saint%20Petersburg&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
    )
        .then(r => r.json())
        .then(r => {
            DATA.city_temperature = Math.round(r.main.temp);
            DATA.city_weather = r.weather[0].description;
            DATA.city_weather_icon = r.weather[0].icon;
            DATA.sun_rise = new Date(r.sys.sunrise * 1000).toLocaleString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Moscow',
            });
            DATA.sun_set = new Date(r.sys.sunset * 1000).toLocaleString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Moscow',
            });
        });
}

async function setInstagramPosts() {
    const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount('visitpetersburg', 3);
    DATA.img1 = instagramImages[0];
    DATA.img2 = instagramImages[1];
    DATA.img3 = instagramImages[2];
}

async function generateReadMePhotoBlock() {
    await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        const options = {
            allowEmptyPaths: true,
            disableGlobs: true,
            files: 'README.md',
            from: /<!--views:photo-marker:start-->[\s\S]*?<!--views:photo-marker:end-->/gm,
            to: '<!--views:photo-marker:start-->\n' + output + '\n<!--views:photo-marker:end-->'
        };
        replaceContent(options);
    });
}

async function replaceContent(options) {
    try {
        const results = await replace(options)
        console.log('Replacement results:', results);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

async function runWorkflow() {
    /**
     * Fetching weather data
     */
    await setWeatherInformation();

    /**
     * Getting posted pictures
     */
    await setInstagramPosts();

    /**
     * Generating README block by mustache template
     */
    await generateReadMePhotoBlock();

    /**
     * Destructuring puppeteer service
     */
    await puppeteerService.close();
}

runWorkflow();