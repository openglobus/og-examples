import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import geo_object from './geo_object.js?raw'

export default function GeoObjectExample() {
    return (
        <GlobusSandbox files={{
            "index.js": geo_object
        }}/>
    )
}