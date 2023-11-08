import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import billboard from './attribution.ts?raw'
import button from './button.ts?raw'

export default function AttributionExample() {
    return (
        <GlobusSandbox files={{
            "index.ts": billboard,
            "button.ts": button
        }}
        externalResources={[
            "https://pavletto.github.io/og_resources/geo_object/penguin.png"
        ]}>
        </GlobusSandbox>
    )
}