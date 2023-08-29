import  {useGlobeContext} from './globus.js'
import  './buttons.css'
import {LonLat} from "@openglobus/og";


export default function ButtonContainer() {
    const {globe} = useGlobeContext()
    const clickFlyTo = () => {
        let ell = globe.planet.ellipsoid;

        let destPos = new LonLat(10.13176, 46.18868, 10779);
        let viewPoi = new LonLat(9.98464, 46.06157, 3039);

        let lookCart = ell.lonLatToCartesian(viewPoi);
        let upVec = ell.lonLatToCartesian(destPos).normalize();

        // 0 - is an amplitude of the fly track
        globe.planet.camera.flyLonLat(destPos, lookCart, upVec, 0);
    }

    return <div className={'button-container'}>
        <button onClick={clickFlyTo}>Fly to</button>
    </div>
}
