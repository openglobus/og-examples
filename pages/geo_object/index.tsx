import GlobusSandbox from "/components/globus/GlobusSandbox.tsx";
import geo_object from './geo_object.ts?raw'

export default function GeoObjectExample() {
    return (
        <GlobusSandbox files={{
            "index.ts": geo_object
        }}/>
    )
}