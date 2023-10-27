'use strict';

import {
    Globe,
    GlobusTerrain,
    XYZ,
    SkyBox
} from "../../external/og/lib/@openglobus/og.esm.js";

var osm = new XYZ("OpenStreetMap", {
    isBaseLayer: true,
    url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    visibility: true,
    attribution: 'Data @ OpenStreetMap contributors, ODbL'
});


var globus = new Globe({
    target: "globus",
    skybox: SkyBox.createDefault('../../res/'),
    name: "Earth",
    terrain: new GlobusTerrain(),
    layers: [osm],
    sun: {
        active: true
    },
    resourcesSrc: "../../external/og/lib/@openglobus/res",
    fontsSrc: "../../external/og/lib/@openglobus/res/fonts"
});
