import axios from "axios";
import {createContext, useState} from 'react';

const ExampleContext = createContext();

function Provider({children}) {

    const [exampleHtml, setExample] = useState("");
    const [url, setUrl] = useState("");

    const refresh = async () => {
        const response = await axios.get(url, {responseType: 'text'});
        setExample(response.data);
    }

    const setExampleHtml = (htmlStr) => {
        setExample(htmlStr);
    }

    const loadExample = async (url) => {
        setUrl(url);
        const response = await axios.get(url, {responseType: 'text'});
        setExample(response.data);
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