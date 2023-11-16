import "./List.css";
import {NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function List({examples, onClick}) {

    const examplesLinks = examples.map((example) => {
        return (
            <NavLink to={`examples/${example.id}`} key={example.id}>
                <Button variant="light" onClick={onClick}>{example.label}</Button>
            </NavLink>
        )
    });

    return (
        <div className="og-sandbox_list">
            {examplesLinks}
        </div>
    )
}

export default List;