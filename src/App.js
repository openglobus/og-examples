import './App.css';

import axios from "axios";
import {useEffect, useState, useCallback} from "react";
import {Route, Routes, useParams, BrowserRouter as Router} from 'react-router-dom';

import Editor from "./components/Editor";
import Frame from "./components/Frame";
import List from './components/List';
import {composeCodeHtml, parseHtml} from "./components/shared";
import useExampleContext from "./hooks/useExampleContext";

import SplitPane, {Pane} from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

const ExampleDetail = ({examplesUrl}) => {

    const {id} = useParams();

    const {exampleHtml, loadExample, setExampleHtml} = useExampleContext();

    const [sizes, setSizes] = useState(['44%', 'auto']);

    // Fixing mouse pointer evetns when dragging panels
    const [drag, setDrag] = useState(false);

    useEffect(() => {
        let _id = id || 'baseLayers';
        if (examplesUrl.length) {
            loadExample(`${examplesUrl}/${_id}/${_id}.html`, _id);
        }
    }, [id, examplesUrl]);

    const handleRun = (htmlCode) => {
        setExampleHtml(htmlCode);
    }

    const handleRaw = (event) => {
        event.preventDefault();
        let _id = id || 'baseLayers';
        window.open(`${examplesUrl}/${_id}/${_id}.html`, '_blank');
    }

    const handleDragStart = function () {
        setDrag(true)
    }

    const handleDragEnd = function () {
        setDrag(false)
    }

    return (<>
            <div className="og-examples__panel">
                <SplitPane
                    split='vertical'
                    sizes={sizes}
                    onChange={setSizes}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <Pane>
                        <Editor examplesUrl={examplesUrl} onRun={handleRun} onRaw={handleRaw} code={exampleHtml}
                                id={id}/>
                    </Pane>
                    <Frame examplesUrl={examplesUrl} code={exampleHtml} id={id}
                           style={{"pointerEvents": drag ? "none" : ""}}/>
                </SplitPane>
            </div>
        </>
    )
};

function App() {

    const {refresh} = useExampleContext();

    const [examples, setExamples] = useState([]);
    const [examplesUrl, setExamplesUrl] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`${window.location.origin}/examples.json`);
            setExamples(response.data);
        } catch (error) {
            console.error('Error fetching examples:', error);
        }
    }, []);

    const fetchConfig = useCallback(async () => {
        const response = await axios.get(`${window.location.origin}/config.json`);
        setExamplesUrl(response.data.url);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchConfig();
    }, [fetchConfig]);

    return (<Router>
        <List examples={examples} onClick={() => {
            refresh();
        }}/>
        <Routes>
            <Route path="/" element={<ExampleDetail examplesUrl={examplesUrl}/>}/>
            <Route path="/examples/:id" element={<ExampleDetail examplesUrl={examplesUrl}/>}/>
        </Routes>
    </Router>);
}

export default App;
