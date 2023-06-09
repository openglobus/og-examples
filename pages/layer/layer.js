import { XYZ } from "@openglobus/og";
import { $btnOSM, $btnSAT } from "./button.js";
import globus from "./globus.js";

$btnOSM.onclick = function () {
    osm.setVisibility(true);
};

$btnSAT.onclick = function () {
    sat.setVisibility(true);
};

let osm = new XYZ("OpenStreetMap", {
    isBaseLayer: true,
    url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    visibility: true,
    attribution: 'Data @ OpenStreetMap contributors, ODbL'
});

let sat = new XYZ("MapBox Satellite", {
    isBaseLayer: true,
    url: "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWdldmxpY2hzY2FuZXgiLCJhIjoiY2pwcGdsaXlnMDQzdDQybXhsOWZlbXBvdSJ9.fR2YE-ehJA4iajaJBAPKvw",
    visibility: false,
    attribution: `Mapbox Sattelite`
});

globus.planet.addLayer(osm);
globus.planet.addLayer(sat);
