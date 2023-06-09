import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import billboard from './attribution.js?raw'
import button from './button.js?raw'

export default function AttributionExample() {
    return (
        <GlobusSandbox files={{
            "index.js": billboard,
            "button.js": button
        }}
        externalResources={[
            "https://pavletto.github.io/og_resources/geo_object/penguin.png"
        ]}>
        </GlobusSandbox>
    )
}