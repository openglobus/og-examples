import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import camera from '../cameraFly/camera.js?raw'
import button from './button.js?raw'
export default function MarsExample() {
    return (
        <GlobusSandbox files={{
            "index.js": camera,
            "button.js": button
        }}
        externalResources={[
        ]}/>
    )
}