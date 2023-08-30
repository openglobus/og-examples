import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css"
import Nav from "./components/Nav.jsx";
import routers_json from "./routes.json"
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

    const jsonData = routers_json.find((item) => item.path === `/${normalizedPathName.toLowerCase()}`)
        routes.push({
            path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
            title,
            Element: pages[path].default,
            loader: pages[path]?.loader,
            action: pages[path]?.action,
            ErrorBoundary: pages[path]?.ErrorBoundary,
            ...jsonData
        });
}
const router = createBrowserRouter(
    routes.map(({Element, ErrorBoundary, ...rest}) => {
        return {
            ...rest,
            element: <><Nav></Nav><Element/></>,
            ...(ErrorBoundary && {errorElement: <ErrorBoundary/>}),
        }
    }),
    {
        basename: import.meta.env.VITE_BASENAME || '/'
    }
);

function App() {

    return (
        <RouterProvider router={router} basename={"/sandbox"}>

        </RouterProvider>
    )
}

export {routes, App}