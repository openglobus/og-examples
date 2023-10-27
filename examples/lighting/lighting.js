"use strict";

import {
    Globe,
    GlobusTerrain,
    XYZ,
    control
} from "../../external/og/lib/@openglobus/og.esm.js";


var osm = new XYZ("OpenStreetMap", {
    isBaseLayer: true,
    url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    visibility: true,
    attribution: "Data @ OpenStreetMap contributors, ODbL"
});

var globe = new Globe({
    target: "earth",
    name: "Earth",
    terrain: new GlobusTerrain(),
    layers: [osm],
    resourcesSrc: "../../external/og/lib/@openglobus/res",
    fontsSrc: "../../external/og/lib/@openglobus/res/fonts"
});

globe.planet.addControl(new control.Lighting());
