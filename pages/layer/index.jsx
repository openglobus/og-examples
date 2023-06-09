import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import layer from './layer.js?raw'
import button from './button.js?raw'

export default function LayerExample() {
    return (
        <GlobusSandbox files={{
            "index.js": layer,
            "button.js": button
        }}
        externalResources={[
        ]}/>
    )
}