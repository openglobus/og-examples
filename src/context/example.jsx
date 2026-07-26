import {createContext, useCallback, useState} from 'react';
import {composeCodeHtml, parseHtml} from "../components/shared";

const ExampleContext = createContext();

function Provider({children}) {

    const [exampleHtml, setExample] = useState("");
    const [url, setUrl] = useState("");

    const fetchHtml = useCallback(async (url) => {
        let response = await fetch(url);
        return response.text();
    }, []);

    const refresh = useCallback(async () => {
        let text = await fetchHtml(url);
        const htmlCode = composeCodeHtml({...parseHtml(text)});
        setExample(htmlCode);
    }, [fetchHtml, url]);

    const loadExample = useCallback(async (url) => {
        setUrl(url);
        let text = await fetchHtml(url);
        setExample(text);
    }, [fetchHtml]);

    const setExampleHtml = useCallback((htmlStr) => {
        setExample(htmlStr);
    }, []);

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
