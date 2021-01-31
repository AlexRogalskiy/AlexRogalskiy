require('dotenv').config();
require('https').globalAgent.options.ca = require('ssl-root-cas').create();

// services
const Mustache = require('mustache');
const fetch = require('node-fetch');
const fs = require('fs');
const puppeteerService = require('./src/services/puppeteer.service');
const replace = require('replace-in-file');

// constants
const CONFIG_PROPS = require("./src/configs/constants.js").CONFIG_PROPS
const SERVICE_PROPS = require("./src/configs/constants.js").SERVICE_PROPS

let DATA = {
    refresh_date: new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: 'Europe/Moscow',
    }),
};

async function updateWeatherInformation() {
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

async function updateInstagramPosts() {
    const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount(SERVICE_PROPS.INSTAGRAM.tag, SERVICE_PROPS.INSTAGRAM.number);
    DATA.img1 = instagramImages[0];
    DATA.img2 = instagramImages[1];
    DATA.img3 = instagramImages[2];
}

async function updatePhotoView() {
    await fs.readFile(SERVICE_PROPS.INSTAGRAM.view, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        const options = {
            allowEmptyPaths: true,
            disableGlobs: true,
            files: CONFIG_PROPS.target,
            from: SERVICE_PROPS.INSTAGRAM.placeholder,
            to: SERVICE_PROPS.INSTAGRAM.replacer(output)
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
    await updateWeatherInformation();

    /**
     * Getting posted pictures
     */
    await updateInstagramPosts();

    /**
     * Generating README photo block by mustache template
     */
    await updatePhotoView();

    /**
     * Destructuring puppeteer service
     */
    await puppeteerService.close();
}

runWorkflow();