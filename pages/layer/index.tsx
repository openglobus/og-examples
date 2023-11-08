import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import layer from './layer?raw'
import button from './button.ts?raw'

export default function LayerExample() {
    return (
        <GlobusSandbox files={{
            "index.ts": layer,
            "button.ts": button
        }}
        externalResources={[
        ]}/>
    )
}