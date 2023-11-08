import GlobusSandbox from "/components/globus/GlobusSandbox.tsx";
import billboard from './billboard.ts?raw'

export default function BillboardExample() {
    return (
        <GlobusSandbox files={{
            "index.ts": billboard
        }}/>
    )
}