import './Frame.css';

import {useRef, useEffect} from "react";
import {composeCodeHtml, parseHtml} from "./shared";

function Frame({examplesUrl, code, style, id}) {

    const iframeRef = useRef();

    useEffect(() => {
        const htmlCode = composeCodeHtml({examplesUrl, id, ...parseHtml(code)});
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.srcdoc = htmlCode;
        }
    }, [code, examplesUrl, id]);

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
