import {useContext} from "react";
import ExampleContext from "../context/example";

function useExampleContext() {
    const context = useContext(ExampleContext);

    if (!context) {
        throw new Error("useExampleContext must be used within an ExampleContext Provider");
    }

    return context;
}

export default useExampleContext;