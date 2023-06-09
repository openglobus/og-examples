import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import billboard from './billboard.js?raw'

export default function BillboardExample() {
    return (
        <GlobusSandbox files={{
            "index.js": billboard
        }}/>
    )
}