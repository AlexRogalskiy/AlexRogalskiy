// configuration properties
const CONFIG_PROPS = {
  "locale": "en-GB",
  "short_date_format": {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Moscow',
  },
  "long_date_format": {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Moscow'
  },
  "filename": "README.md",
  "directions": [ 'north', 'north-west', 'west', 'south-west', 'south', 'south-east', 'east', 'north-east' ]
}

// service properties
const SERVICE_PROPS = {
  INSTAGRAM: {
    "number": 4,
    "tag": "visitpetersburg",
    "view": "./src/views/photo-travel.view.mustache",
    "placeholder": /<!--views:photo-marker:start-->[\s\S]*?<!--views:photo-marker:end-->/gm,
    "replacer": (value) => '<!--views:photo-marker:start-->\n' + value + '\n<!--views:photo-marker:end-->'
  }
}

module.exports = {
  CONFIG_PROPS,
  SERVICE_PROPS
}
