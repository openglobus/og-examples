import './Editor.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useState, useEffect} from "react";
import {composeCodeHtml, parseHtml} from './shared';
import CodeEditor from '@uiw/react-textarea-code-editor';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Button from 'react-bootstrap/Button';

function Editor({examplesUrl, onRun, onRaw, code, id}) {

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
        onRun(composeCodeHtml({examplesUrl, head, body, script, id}));
    }

    return (
        <div className="og-examples__editor">

            <div className="og-examples__toolbar">
                <Button onClick={handleRun}>Run</Button>
                <Button variant="link" onClick={onRaw}>Link</Button>
            </div>

            <Tabs
                defaultActiveKey="script"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="html" title="Head">
                    <div className="og-examples__code">
                        <CodeEditor
                            data-color-mode="dark"
                            value={head}
                            language="html"
                            placeholder="<head>...</head>"
                            onChange={handleHeadChange}
                            padding={15}
                            style={{
                                fontSize: 14,
                                //backgroundColor: "#f5f5f5",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                    </div>
                </Tab>

                <Tab eventKey="body" title="HTML">
                    <div className="og-examples__code">
                        <CodeEditor
                            data-color-mode="dark"
                            value={body}
                            language="html"
                            placeholder="<body>...</body>"
                            onChange={handleBodyChange}
                            padding={15}
                            style={{
                                fontSize: 14,
                                //backgroundColor: "#f5f5f5",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                    </div>
                </Tab>

                <Tab eventKey="script" title="Script">
                    <div className="og-examples__code">
                        <CodeEditor
                            data-color-mode="dark"
                            value={script}
                            language="js"
                            placeholder="<script>...</script>"
                            onChange={handleScriptChange}
                            padding={15}
                            style={{
                                fontSize: 14,
                                //backgroundColor: "#f5f5f5",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                    </div>
                </Tab>

            </Tabs>

        </div>
    )
}

export default Editor;