import GlobusSandbox from "/components/globus/GlobusSandbox.tsx";
import canvasTiles from './canvasTiles.ts?raw'

export default function MarsExample() {
    return (
        <GlobusSandbox files={{
            "index.ts": canvasTiles
        }}
        externalResources={[
        ]}/>
    )
}