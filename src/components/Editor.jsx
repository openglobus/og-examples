import './Editor.css';

import {useState, useEffect} from "react";
import {composeCodeHtml, parseHtml} from './shared';
import CodeEditor from '@uiw/react-textarea-code-editor';

function Editor({onRun, onRaw, code}) {

    const [head, setHead] = useState('');
    const [body, setBody] = useState('');
    const [script, setScript] = useState('');

    useEffect(() => {
        const {head, body, script} = parseHtml(code);
        setHead(head);
        setBody(body);
        setScript(script);
    }, [code]);

    const handleHeadChange = (event) => {
        setHead(event.target.value);
    }

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    }

    const handleScriptChange = (event) => {
        setScript(event.target.value);
    }

    const handleRun = (event) => {
        event.preventDefault();
        onRun(composeCodeHtml({head, body, script}));
    }

    return (
        <div className="og-examples__editor">
            <div className="og-examples__toolbar">
                <button className="og-examples__run" onClick={handleRun}>Run</button>
                <button className="og-examples__raw" onClick={onRaw}>Raw</button>
            </div>

            <div className="og-examples__code">
                <CodeEditor
                    value={head}
                    language="html"
                    placeholder="<head>...</head>"
                    onChange={handleHeadChange}
                    padding={15}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </div>

            <div className="og-examples__code">
                <CodeEditor
                    value={body}
                    language="html"
                    placeholder="<body>...</body>"
                    onChange={handleBodyChange}
                    padding={15}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </div>

            <div className="og-examples__code">
                <CodeEditor
                    value={script}
                    language="js"
                    placeholder="<script>...</script>"
                    onChange={handleScriptChange}
                    padding={15}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </div>

            {/*<textarea className="og-examples__code" value={head} onChange={handleHeadChange}></textarea>*/}
            {/*<textarea className="og-examples__code" value={body} onChange={handleBodyChange}></textarea>*/}
            {/*<textarea className="og-examples__code" value={script} onChange={handleScriptChange}></textarea>*/}
        </div>
    )
}

export default Editor;