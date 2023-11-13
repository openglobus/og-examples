import './App.css';

import axios from "axios";
import {useEffect, useState, useCallback} from "react";
import {Route, Routes, useParams, BrowserRouter as Router} from 'react-router-dom';

import Editor from "./components/Editor";
import Frame from "./components/Frame";
import List from './components/List';
import useExampleContext from "./hooks/useExampleContext";
import {EXAMPLES_URL} from './components/shared';


const ExampleDetail = () => {
    const {id} = useParams();

    const {exampleHtml, loadExample, setExampleHtml} = useExampleContext();

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

    return (<>
        <div className="og-examples__panel">
            <Editor onRun={handleRun} onRaw={handleRaw} code={exampleHtml}/>
            <Frame code={exampleHtml}/>
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
