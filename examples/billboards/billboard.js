'use strict';

import {
    Entity,
    EntityCollection,
    LonLat,
    Vec3,
    Globe,
    GlobusTerrain,
    XYZ,
    Ellipsoid,
    utils
} from "../../external/og/lib/@openglobus/og.esm.js";

function rnd(min, max) {
    return Math.random() * (max - min) + min;
}

let entities = [],
    colors = ['red', 'orange', 'yellow', 'green', 'lightblue', 'darkblue', 'purple']

for (let i = 0; i < 5000; i++) {
    entities.push(new Entity({
        'name': 'sat-' + i,
        'lonlat': [rnd(-180, 180), rnd(-90, 90), rnd(100000, 5000000)],
        'billboard': {
            'src': './carrot.png',
            'size': [24, 24],
            'color': colors[i % 7],
            'rotation': rnd(0, 360)
        },
        'properties': {
            'bearing': rnd(0, 360),
            'color': colors[i % 7]
        }
    }));
}

let carrots = new EntityCollection({
    'entities': entities,
    'scaleByDistance': [6000000, 24000000, 10000000000]
});

carrots.events.on("mouseenter", function (e) {
    let b = e.pickingObject.billboard;
    b.setColor(1, 1, 1);
});

carrots.events.on("mouseleave", function (e) {
    let b = e.pickingObject.billboard;
    b.setColorHTML(e.pickingObject.properties.color);
});

carrots.events.on("lclick", function (e) {
    e.pickingObject.billboard.remove();
});

function toQuadKey(x, y, z) {
    var index = '';
    for (let i = z; i > 0; i--) {
        var b = 0;
        var mask = 1 << (i - 1);
        if ((x & mask) !== 0) b++;
        if ((y & mask) !== 0) b += 2;
        index += b.toString();
    }
    return index;
}

let sat = new XYZ("sat", {
    subdomains: ['t0', 't1', 't2', 't3'],
    url: "https://ecn.{s}.tiles.virtualearth.net/tiles/a{quad}.jpeg?n=z&g=7146",
    isBaseLayer: true,
    maxNativeZoom: 19,
    defaultTextures: [{color: "#001522"}, {color: "#E4E6F3"}],
    attribution: `<div style="transform: scale(0.8); margin-top:-2px;"><a href="http://www.bing.com" target="_blank"><img style="position: relative; top: 2px;" title="Bing Imagery" src="https://sandcastle.cesium.com/CesiumUnminified/Assets/Images/bing_maps_credit.png"></a> © 2021 Microsoft Corporation</div>`,
    urlRewrite: function (s, u) {
        return utils.stringTemplate(u, {
            's': this._getSubdomain(),
            'quad': toQuadKey(s.tileX, s.tileY, s.tileZoom)
        });
    },
    specular: [0.00063, 0.00055, 0.00032],
    ambient: "rgb(90,90,90)",
    diffuse: "rgb(350,350,350)",
    shininess: 20,
    nightTextureCoefficient: 2.7
});


let globus = new Globe({
    target: "globus",
    name: "Earth",
    terrain: new GlobusTerrain(),
    layers: [sat],
    atmosphereEnabled: true,
    resourcesSrc: "../../external/og/lib/@openglobus/res",
    fontsSrc: "../../external/og/lib/@openglobus/res/fonts",
    sun: {
        stopped: true
    }
});

globus.planet.events.on("draw", () => {
    carrots.each(function (e) {
        let c = e.getLonLat();
        let ll = globus.planet.ellipsoid.getBearingDestination(c, e.properties.bearing, 2000);
        e.properties.bearing = globus.planet.ellipsoid.inverse(c, ll).finalAzimuth;
        e.setLonLat(new LonLat(ll.lon, ll.lat, c.height));
        e.billboard.setRotation(e.billboard.getRotation() + 0.01);
    });
});

carrots.addTo(globus.planet);

globus.planet.flyLonLat(new LonLat(54.5, 43.5, 20108312));