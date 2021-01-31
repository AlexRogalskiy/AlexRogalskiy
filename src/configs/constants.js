const CONFIG_PROPS = {
    "target": "README.md"
}

const SERVICE_PROPS = {
    INSTAGRAM: {
        "number": 4,
        "tag": "visitpetersburg",
        "view": "./src/views/photo-marker.view.mustache",
        "placeholder": /<!--views:photo-marker:start-->[\s\S]*?<!--views:photo-marker:end-->/gm,
        "replacer": (value) => '<!--views:photo-marker:start-->\n' + value + '\n<!--views:photo-marker:end-->'
    }
}

module.exports = {
    CONFIG_PROPS,
    SERVICE_PROPS
}