import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import canvasTiles from '../canvasTiles/canvasTiles.js?raw'

export default function MarsExample() {
    return (
        <GlobusSandbox files={{
            "index.js": canvasTiles
        }}
        externalResources={[
        ]}/>
    )
}