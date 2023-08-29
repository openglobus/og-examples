import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css"
import { TitleContext } from '/components/TitleContext';
import { useContext } from 'react';
import Nav from "./pages/index.jsx";

const pages = import.meta.glob("./pages/**/*.jsx", {eager: true});

const routes = [];
for (const path of Object.keys(pages)) {
    const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
    if (!fileName) {
        continue;
    }
    const normalizedPathName = fileName.includes("$")
            ? fileName.replace("$", ":")
            : fileName.replace(/\/index/, ""),
        lower_title = normalizedPathName.replace('_', ' ').replace('/', ''),
        title = lower_title.charAt(0).toUpperCase() + lower_title.slice(1)
    // const { title } = useContext(TitleContext);
    routes.push({
        path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
         title,
        Element: pages[path].default,
        loader: pages[path]?.loader,
        action: pages[path]?.action,
        ErrorBoundary: pages[path]?.ErrorBoundary,
    });

}
const router = createBrowserRouter(
    routes.map(({Element, ErrorBoundary, ...rest}) => {
        return {
            ...rest,
            element: <div><Nav></Nav><Element/></div>,
            ...(ErrorBoundary && {errorElement: <ErrorBoundary/>}),
        }
    })
);

function App() {

    return (
        <RouterProvider router={router}>

        </RouterProvider>
    )
}

export {routes, App}