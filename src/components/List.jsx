import "./List.css";
import {useState} from "react";
import {NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function List({examples, onClick}) {

    const [filter, setFilter] = useState('');

    const examplesLinks = examples.filter((example) => {
        return filter.length === 0 || example.label.toLowerCase().includes(filter.toLowerCase());
    }).map((example) => {
        return (
            <NavLink to={`examples/${example.id}`} key={example.id}>
                <Button variant="light" onClick={() => {
                    onClick(example.id);
                }}>{example.label}</Button>
            </NavLink>
        )
    });

    const handleChange = (event) => {
        event.preventDefault();
        setFilter(event.target.value);
    }

    return (
        <div className="og-sandbox_examples">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Search..." onChange={handleChange}/>
            </Form.Group>
            <div className="og-sandbox_list">
                {examplesLinks}
            </div>
        </div>
    )
}

export default List;