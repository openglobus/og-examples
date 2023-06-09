import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import mars from './mars.js?raw'
export default function MarsExample() {
    return (
        <GlobusSandbox files={{
            "index.js": mars
        }}
        externalResources={[
        ]}/>
    )
}