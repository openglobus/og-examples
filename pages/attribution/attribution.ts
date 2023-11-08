import { layer } from "@openglobus/og";
import globus from "./globus.ts";
import { $btn } from "./button";

const states = new layer.WMS("USA Population", {
    extent: [[-128, 24], [-66, 49]],
    visibility: true,
    isBaseLayer: false,
    url: "//openglobus.org/geoserver/",
    layers: "topp:states",
    opacity: 1.0,
    attribution: 'Hi!',
    transparentColor: [1.0, 1.0, 1.0]
});

$btn.onclick = function () {
    states.setAttribution("Hello, WMS default USA population states example!");
};

globus.planet.addLayer(states);
globus.planet.viewExtent(states.getExtent());