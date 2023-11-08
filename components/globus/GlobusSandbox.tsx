import globus from './globus.ts?raw'
import style from './style.css?raw'
import {Sandpack} from "@codesandbox/sandpack-react";
import {SandpackThemeProp} from "@codesandbox/sandpack-react/types";

interface GlobusSandboxProps {
    files: any,
    externalResources?: string[],
    options?: any,
    template?: SandpackThemeProp
}
export default function GlobusSandbox({files, options, template} :GlobusSandboxProps) {
    return (
        <Sandpack
            customSetup={{
                dependencies: {
                    '@openglobus/og': '0.18.4',
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
                "globus.ts": globus,
                ...files
            }}
            theme="dark"
            template={template || "vanilla-ts"}
        />
    )
}
GlobusSandbox.defaultProps = {
    title: "Globus Sandbox",
}
