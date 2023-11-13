import './App.css';

import axios from "axios";
import {useEffect, useRef, useState, useCallback} from "react";
import {Route, Routes, useParams, BrowserRouter as Router} from 'react-router-dom';

import ExampleEditor from "./components/ExampleEditor";
import ExamplesList from './components/ExamplesList';
import useExampleContext from "./hooks/useExampleContext";
import {EXAMPLES_URL, composeCodeHtml, parseHtml} from './components/shared';


const ExampleDetail = () => {
    const {id} = useParams();

    const {exampleHtml, loadExample, setExampleHtml} = useExampleContext();

    const iframeRef = useRef();
    const runCode = (html) => {
        const htmlCode = composeCodeHtml(parseHtml(html));
        const iframe = iframeRef.current;
        iframe.srcdoc = htmlCode;
    };

    useEffect(() => {
        let _id = id || 'baseLayers';
        loadExample(`${EXAMPLES_URL}/${_id}/${_id}.html`);
    }, [id]);

    useEffect(() => {
        const updatedHtml = composeCodeHtml(parseHtml(exampleHtml));
        runCode(updatedHtml);
    }, [exampleHtml]);

    const handleRun = (htmlCode) => {
        setExampleHtml(htmlCode);
        runCode(htmlCode);
    }

    const handleRaw = (event) => {
        event.preventDefault();
        console.log(`Open: ${EXAMPLES_URL}/${id}/${id}.html`);
    }

    return (<>
        <div className="og-examples__panel">
            <ExampleEditor onRun={handleRun} onRaw={handleRaw} code={exampleHtml}/>
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
