import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import button from './button.js?raw'
import styles from './buttons.css?raw'
import App from './App.js?raw'
import globus from '../../components/globus/globusreact.jsx?raw'
export default function AttributionExample() {
    return (
        <GlobusSandbox files={{
            "App.js": App,
            "button.js": button,
            "buttons.css": styles,
            "globus.js": globus
        }}
                       template="react"
        externalResources={[
            "https://pavletto.github.io/og_resources/geo_object/penguin.png"
        ]}>
        </GlobusSandbox>
    )
}