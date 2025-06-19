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

const ExampleDetail = ({examplesUrl, examples, refresh}) => {
    const {id} = useParams();
    const {exampleHtml, loadExample, setExampleHtml} = useExampleContext();
    const [sizes, setSizes] = useState(['44%', 'auto']);
    const [drag, setDrag] = useState(false);
    const [showCode, setShowCode] = useState(window.innerWidth > 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setShowCode(!mobile);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const toggleCode = () => {
        setShowCode(!showCode);
    }

    if (isMobile) {
        return (
            <div className="og-examples__mobile-layout">
                <div className="og-examples__frame-container">
                    {showCode && (
                        <button 
                            className="code-toggle-btn"
                            onClick={toggleCode}
                        >
                            Hide Code
                        </button>
                    )}
                    {showCode ? (
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
                    ) : (
                        <>
                            <Frame examplesUrl={examplesUrl} code={exampleHtml} id={id}
                                   style={{"pointerEvents": drag ? "none" : ""}}/>
                            <button 
                                className="code-toggle-btn"
                                onClick={toggleCode}
                            >
                                Show Code
                            </button>
                        </>
                    )}
                </div>
                <div className="og-examples__list-container">
                    <List 
                        examples={examples} 
                        onClick={(id) => {
                            if (window.location.pathname.endsWith(id)) {
                                refresh();
                            }
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
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
    );
};

function App() {
    const {refresh} = useExampleContext();
    const [examples, setExamples] = useState([]);
    const [examplesUrl, setExamplesUrl] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    return (
        <Router>
            {!isMobile && (
                <List examples={examples} onClick={(id) => {
                    if (window.location.pathname.endsWith(id)) {
                        refresh();
                    }
                }}/>
            )}
            <Routes>
                <Route path="/" element={<ExampleDetail examplesUrl={examplesUrl} examples={examples} refresh={refresh}/>}/>
                <Route path="/examples/:id" element={<ExampleDetail examplesUrl={examplesUrl} examples={examples} refresh={refresh}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
