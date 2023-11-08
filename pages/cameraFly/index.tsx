import GlobusSandbox from "/components/globus/GlobusSandbox.tsx";
import camera from './camera.ts?raw'
import button from './button.ts?raw'
export default function MarsExample() {
    return (
        <GlobusSandbox files={{
            "index.ts": camera,
            "button.ts": button
        }}
        externalResources={[
        ]}/>
    )
}