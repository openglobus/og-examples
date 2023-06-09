import { Globe, quadTreeStrategyType, terrain, XYZ } from "@openglobus/og";
import './style.css'
import '@openglobus/og/css/og.css';

const globus = new Globe({
    name: "mars",
    quadTreeStrategyPrototype: quadTreeStrategyType.mars,
    target: "app",
    terrain: new terrain.EmptyTerrain(),
    layers: [
        new XYZ("OSM", {
            'isBaseLayer': true,
            'url': "https://astro.arcgis.com/arcgis/rest/services/OnMars/MDIM/MapServer/tile/{z}/{y}/{x}?blankTile=false",
            'visibility': true,
            'attribution': 'Data @ USGS Astrogeology Science Center, NASA, JPL, Esri'
        })
    ],
    sun: {
        active: false
    },
    useNightTexture: false,
    useSpecularTexture: false
});

// globus.planet.atmosphereEnabled = true;