import axios from "axios";
import {createContext, useState} from 'react';

const ExampleContext = createContext();

function Provider({children}) {

    const [exampleHtml, setExample] = useState("");
    const [url, setUrl] = useState("");

    const fetchHtml = async (url) => {
        let response = await fetch(url);
        return response.text();
    }

    const refresh = async () => {
        let text = await fetchHtml(url);
        setExample(text);
    }

    const setExampleHtml = (htmlStr) => {
        setExample(htmlStr);
    }

    const loadExample = async (url) => {
        setUrl(url);
        let text = await fetchHtml(url);
        setExample(text);
    }

    const valueToShare = {
        refresh,
        setExampleHtml,
        exampleHtml,
        loadExample
    };

    return (
        <ExampleContext.Provider value={valueToShare}>
            {children}
        </ExampleContext.Provider>
    )
}

export {Provider};
export default ExampleContext;