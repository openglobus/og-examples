import './Frame.css';

import {useRef, useEffect} from "react";
import {composeCodeHtml, parseHtml} from "./shared";

function Frame({code}) {

    const iframeRef = useRef();

    useEffect(() => {
        runCode(code);
    }, [code])

    const runCode = (html) => {
        const htmlCode = composeCodeHtml(parseHtml(html));
        const iframe = iframeRef.current;
        iframe.srcdoc = htmlCode;
    };

    return (
        <div className="og-examples__frame">
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