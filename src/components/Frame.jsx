import './Frame.css';

import {useRef, useEffect} from "react";
import useExampleContext from "../hooks/useExampleContext";
import {composeCodeHtml, parseHtml} from "./shared";

function Frame({examplesUrl, code, style, id}) {

    const iframeRef = useRef();

    useEffect(() => {
        runCode(code);
    }, [code]);

    const runCode = (html) => {
        const htmlCode = composeCodeHtml({examplesUrl, id, ...parseHtml(html)});
        const iframe = iframeRef.current;
        iframe.srcdoc = htmlCode;
    };

    return (
        <div className="og-examples__frame" style={style}>
            <iframe
                title="HTML Runner"
                width="100%"
                height="100%"
                ref={iframeRef}
            />
        </div>
    )
}

export default Frame;