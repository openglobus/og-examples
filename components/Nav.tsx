import {routes} from "/App.tsx";
import {RouteObject, useLocation} from "react-router-dom";

export default function Nav() {
    const {pathname} = useLocation();
    console.log(pathname)
    return (
        <nav>
            {routes.filter((route: RouteObject) => route.path !== '/' ).map((route: RouteObject, i: number) => <a key={i} className={pathname === route.path ? 'active' : ''} href={import.meta.env.VITE_BASENAME+route.path}>{route.title}</a>)}
        </nav>
    )
}