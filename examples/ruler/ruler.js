import {
    Globe,
    GlobusTerrain,
    XYZ,
    control
} from "../../lib/@openglobus/og.esm.js";


let osm = new XYZ("osm-1", {
    isBaseLayer: false,
    url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    diffuse: [1, 1, 1],
    maxNativeZoom: 19,
    defaultTextures: [{ color: "#AAD3DF" }, { color: "#F2EFE9" }],
    isSRGB: false
});

var globus = new Globe({
    target: "earth",
    name: "Earth",
    terrain: new GlobusTerrain(),
    layers: [osm]
});

let ruler = new control.RulerSwitcher({
    ignoreTerrain: false
});

globus.planet.addControl(ruler);

//ruler.activate();
