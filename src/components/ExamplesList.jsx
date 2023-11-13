import "./ExamplesList.css";
import {NavLink} from 'react-router-dom';

function ExamplesList({examples, onClick}) {

    const examplesLinks = examples.map((example) => {
        return (
            <NavLink to={`examples/${example.id}`} key={example.id}>
                <button onClick={onClick}>{example.label}</button>
            </NavLink>
        )
    });

    return (
        <div className="og-sandbox_examplesList">
            {examplesLinks}
        </div>
    )
}

export default ExamplesList;