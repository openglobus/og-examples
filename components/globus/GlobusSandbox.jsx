import globus from './globus.js?raw'
import style from './style.css?raw'
import {Sandpack} from "@codesandbox/sandpack-react";

export default function GlobusSandbox({files, externalResources, options, template}) {
    return (
        <Sandpack
            customSetup={{
                dependencies: {
                    '@openglobus/og': '0.17.2',
                },
            }}
            options={{
                preview: 'preview',
                showLineNumbers: true,
                showTabs: true,
                closableTabs: true,
                editorHeight: '100vh',
                editorWidthPercentage: 40,
                ...options
            }}
            files={{
                "style.css": style,
                "globus.js": globus,
                ...files
            }}
            externalResources={externalResources}
            theme="dark"
            template={template || "vanilla"}
        />
    )
}
GlobusSandbox.defaultProps = {
    title: "Globus Sandbox",
}
