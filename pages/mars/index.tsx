import GlobusSandbox from "/components/globus/GlobusSandbox.tsx";
import mars from './mars.ts?raw'
export default function MarsExample() {
    return (
        <GlobusSandbox files={{
            "index.ts": mars
        }}
        externalResources={[
        ]}/>
    )
}