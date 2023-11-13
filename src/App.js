import './App.css';

import {useEffect, useRef, useState, useCallback} from "react";
import {Route, Routes, useParams, BrowserRouter as Router} from 'react-router-dom';
import ExamplesList from './components/ExamplesList';
import useExampleContext from "./hooks/useExampleContext";
import axios from "axios";


const EXAMPLES_URL = "//localhost:8080/examples";
const SANDBOX_SCRIPT = "og-sandbox-script";

function composeCodeHtml({head, body, script}) {
    return `<!DOCTYPE html>
                <html>
                  <head>
                    <base href="${EXAMPLES_URL}">
                    ${head}
                  </head>
                  <body style="width: 100%; height: 100%; position: absolute; margin: 0; padding: 0;">
                    ${body}
                    <script type="module" id=${SANDBOX_SCRIPT}>
                      ${script}
                    </script>
                  </body>
                </html>`;
}

function parseHtml(htmlText) {
    const parser = new DOMParser();
    const el = parser.parseFromString(htmlText, 'text/html');
    if (el.head) {
        let baseEl = el.head.getElementsByTagName('base');
        if (baseEl[0]) {
            el.head.removeChild(baseEl[0]);
        }
    }

    const head = el.head.innerHTML.trim();
    const scriptEl = el.body.querySelector(`#${SANDBOX_SCRIPT}`);
    const script = scriptEl ? scriptEl.innerText.trim() : "";
    if (scriptEl) {
        el.body.removeChild(scriptEl);
    }
    const body = el.body.innerHTML.trim();

    return {head, body, script};
}

const ExampleDetail = () => {
    const {id} = useParams();

    const [head, setHead] = useState('');
    const [body, setBody] = useState('');
    const [script, setScript] = useState('');

    const {exampleHtml, loadExample, setExampleHtml} = useExampleContext();

    const iframeRef = useRef();
    const runCode = (html) => {
        const htmlCode = composeCodeHtml(parseHtml(html));
        const iframe = iframeRef.current;
        iframe.srcdoc = htmlCode;
    };

    useEffect(() => {
        let defid = id || 'baseLayers';
        loadExample(`${EXAMPLES_URL}/${defid}/${defid}.html`);
    }, [id]);

    useEffect(() => {
        const updatedHtml = composeCodeHtml(parseHtml(exampleHtml));
        const {head, body, script} = parseHtml(updatedHtml);
        setHead(head);
        setBody(body);
        setScript(script);
        runCode(updatedHtml);
    }, [exampleHtml]);

    const handleRun = (event) => {
        event.preventDefault();
        const htmlCode = composeCodeHtml({head, body, script});
        setExampleHtml(htmlCode);
        runCode(htmlCode);
    }

    const handleRaw = (event) => {
        event.preventDefault();
        console.log(`Open: ${EXAMPLES_URL}/${id}/${id}.html`);
    }

    const handleHeadChange = (event) => {
        setHead(event.target.value);
    }

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    }

    const handleScriptChange = (event) => {
        setScript(event.target.value);
    }

    return (<>
        <div className="og-examples__panel">
            <div className="og-examples__editor">
                <div className="og-examples__toolbar">
                    <button className="og-examples__run" onClick={handleRun}>Run</button>
                    <button className="og-examples__raw" onClick={handleRaw}>Raw</button>
                </div>
                <textarea className="og-examples__code" value={head} onChange={handleHeadChange}></textarea>
                <textarea className="og-examples__code" value={body} onChange={handleBodyChange}></textarea>
                <textarea className="og-examples__code" value={script} onChange={handleScriptChange}></textarea>
            </div>
            <div className="og-examples__frame">
                <iframe
                    title="HTML Runner"
                    width="100%"
                    height="100%"
                    ref={iframeRef}
                />
            </div>
        </div>
    </>)
};

function App() {

    const {refresh} = useExampleContext();

    const [examples, setExamples] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('//localhost:3000/examples.json');
            setExamples(response.data);
        } catch (error) {
            console.error('Error fetching examples:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (<Router>
        <ExamplesList examples={examples} onClick={() => {
            refresh();
        }}/>
        <Routes>
            <Route path="/" element={<ExampleDetail/>}/>
            <Route path="/examples/:id" element={<ExampleDetail/>}/>
        </Routes>
    </Router>);
}

export default App;
