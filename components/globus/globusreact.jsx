import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import '@openglobus/og/css/og.css';
import './style.css';
import {Globe, utils} from '@openglobus/og';
import {GlobusTerrain} from '@openglobus/og/terrain';
import {XYZ} from '@openglobus/og/layer';
// import {GlobeContextProvider} from "./GlobusContext.jsx";
let globus = null;

const GlobeContext = createContext();

export const GlobeContextProvider = ({children, value}) => {
    const [globe, setGlobe] = useState(globus);
    return <GlobeContext.Provider value={{globe, setGlobe}}>{children}</GlobeContext.Provider>

};

export const useGlobeContext = () => useContext(GlobeContext);
const Globus = ({children}) => {
    const targetRef = useRef(null);

    const { setGlobe } = useGlobeContext();
    useEffect(() => {

        if (!globus) {
            const osm = new XYZ("OpenStreetMap", {
                isBaseLayer: true,
                url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                visibility: true,
                attribution: "Data @ OpenStreetMap contributors, ODbL"
            });

            function toQuadKey(x, y, z) {
                var index = '';
                for (var i = z; i > 0; i--) {
                    var b = 0;
                    var mask = 1 << (i - 1);
                    if ((x & mask) !== 0) b++;
                    if ((y & mask) !== 0) b += 2;
                    index += b.toString();
                }
                return index;
            }

            const sat = new XYZ("sat", {
                isBaseLayer: true,
                subdomains: ['t0', 't1', 't2', 't3'],
                url: "https://ecn.{s}.tiles.virtualearth.net/tiles/a{quad}.jpeg?n=z&g=7146",
                visibility: true,
                attribution: `<a href="http://www.bing.com" target="_blank"><img title="Bing Imagery" src="https://sandcastle.cesium.com/CesiumUnminified/Assets/Images/bing_maps_credit.png" alt="Bing"></a> © 2021 Microsoft Corporation`,
                maxNativeZoom: 19,
                defaultTextures: [{color: "#001522"}, {color: "#E4E6F3"}],
                shininess: 18,
                specular: [0.00063, 0.00055, 0.00032],
                ambient: "rgb(100,100,140)",
                diffuse: "rgb(450,450,450)",
                nightTextureCoefficient: 2.7,
                urlRewrite: function (s, u) {
                    return utils.stringTemplate(u, {
                        's': this._getSubdomain(),
                        'quad': toQuadKey(s.tileX, s.tileY, s.tileZoom)
                    });
                }
            });
            globus = new Globe({
                target: targetRef.current,
                name: "Earth",
                terrain: new GlobusTerrain(),
                layers: [osm, sat],
                autoActivate: true
            });

            globus.planet.atmosphereEnabled = true;

            return () => {
                // globus?.destroy();
                // globus = null;
            };
        } else {
            targetRef.current = globus.$target
        }
        targetRef.current.globus = globus;

        setGlobe(globus);
    }, []);
    return <GlobeContextProvider value={globus}>
        <div id="app" ref={targetRef}>{children}</div>
    </GlobeContextProvider>;
};

export default Globus;