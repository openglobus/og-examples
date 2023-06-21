import {Extent, LonLat} from "@openglobus/og";
import globus from "./globus.js";
import {$btnFlyPoint, $btnViewExtent, $btnViewPoint} from "./button.js";


$btnViewPoint.onclick = function () {
    const DIST = 2000;
    const viewPoi = new LonLat(9.98464, 46.06157, 3039);
    const ell = globus.planet.ellipsoid;
    globus.planet.camera.flyDistance(ell.lonLatToCartesian(viewPoi), DIST);
};

$btnViewExtent.onclick = function () {
    globus.planet.flyExtent(new Extent(new LonLat(9.53297, 46.02795), new LonLat(11.56212, 45.78692)));
};

$btnFlyPoint.onclick = function () {
    let ell = globus.planet.ellipsoid;

    let destPos = new LonLat(10.13176, 46.18868, 10779);
    let viewPoi = new LonLat(9.98464, 46.06157, 3039);

    let lookCart = ell.lonLatToCartesian(viewPoi);
    let upVec = ell.lonLatToCartesian(destPos).normalize();

    // 0 - is an amplitude of the fly track
    globus.planet.camera.flyLonLat(destPos, lookCart, upVec, 0);
};