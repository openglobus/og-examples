import './App.css';

import axios from "axios";
import {useEffect, useState, useCallback} from "react";
import {Route, Routes, useParams, BrowserRouter as Router} from 'react-router-dom';

import Editor from "./components/Editor";
import Frame from "./components/Frame";
import List from './components/List';
import useExampleContext from "./hooks/useExampleContext";
import {EXAMPLES_URL} from './components/shared';

import SplitPane, {Pane} from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

const ExampleDetail = () => {
    const {id} = useParams();

    const {exampleHtml, loadExample, setExampleHtml} = useExampleContext();

    const [sizes, setSizes] = useState(['auto', 'auto']);

    // Fixing mouse pointer evetns when dragging panels
    const [drag, setDrag] = useState(false);

    useEffect(() => {
        let _id = id || 'baseLayers';
        loadExample(`${EXAMPLES_URL}/${_id}/${_id}.html`);
    }, [id]);

    const handleRun = (htmlCode) => {
        setExampleHtml(htmlCode);
    }

    const handleRaw = (event) => {
        event.preventDefault();
        console.log(`Open: ${EXAMPLES_URL}/${id}/${id}.html`);
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
                        <Editor onRun={handleRun} onRaw={handleRaw} code={exampleHtml}/>
                    </Pane>
                    <Frame code={exampleHtml} style={{"pointer-events": drag ? "none" : ""}}/>
                </SplitPane>
            </div>
        </>
    )
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
        <List examples={examples} onClick={() => {
            refresh();
        }}/>
        <Routes>
            <Route path="/" element={<ExampleDetail/>}/>
            <Route path="/examples/:id" element={<ExampleDetail/>}/>
        </Routes>
    </Router>);
}

export default App;
