import "./List.css";
import {useState} from "react";
import {NavLink} from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function normalizeText(value) {
    return (value || "").toString().toLowerCase();
}

function List({examples, onClick}) {
    const [filter, setFilter] = useState('');

    const query = normalizeText(filter).trim();

    const sortedExamples = [...examples].sort((a, b) => {
        return normalizeText(a.label).localeCompare(normalizeText(b.label));
    });

    const examplesLinks = sortedExamples.filter((example) => {
        if (!query.length) {
            return true;
        }

        const tags = Array.isArray(example.tags) ? example.tags : [];
        const haystack = [
            example.label,
            example.id,
            example.summary,
            tags.join(" ")
        ].map(normalizeText).join(" ");

        return haystack.includes(query);
    }).map((example) => {
        const tags = Array.isArray(example.tags) ? example.tags : [];

        return (
            <NavLink
                to={`/examples/${example.id}`}
                key={example.id}
                className="og-example-card-link"
                onClick={() => onClick(example.id)}
            >
                <article className="og-example-card">
                    {example.image ? (
                        <div
                            className="og-example-card__image"
                            style={{backgroundImage: `url(${example.image})`}}
                            aria-hidden="true"
                        />
                    ) : null}
                    <div className="og-example-card__content">
                        <h3 className="og-example-card__title">{example.label}</h3>
                        {example.summary ? (
                            <p className="og-example-card__summary">{example.summary}</p>
                        ) : null}
                    </div>
                    {tags.length ? (
                        <footer className="og-example-card__footer">
                            {tags.map((tag) => (
                                <span className="og-example-card__tag" key={`${example.id}-${tag}`}>
                                    #{tag}
                                </span>
                            ))}
                        </footer>
                    ) : null}
                </article>
            </NavLink>
        );
    });

    const handleChange = (event) => {
        event.preventDefault();
        setFilter(event.target.value || "");
    };

    return (
        <div className="og-sandbox_examples">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="text"
                    placeholder="Search by title, id, #tag..."
                    value={filter}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className="og-sandbox_list">
                {examplesLinks}
            </div>
        </div>
    );
}

export default List;
