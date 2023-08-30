import {routes} from "../App.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect   } from "react";

export default function Index() {

    const router = routes[0];
    let navigate = useNavigate();
    useEffect(() => {
        navigate(router.path)
    })
    return (
        <></>
    )
}