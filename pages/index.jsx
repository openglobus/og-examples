import {routes} from "/App.jsx";

export default function Index() {

    return (
        <nav>
            {routes.map((route, i) => <a key={i} href={route.path}>{route.title}</a>)}
        </nav>
    )
}