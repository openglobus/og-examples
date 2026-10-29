import "./List.css";
import {useEffect, useState} from "react";
import {NavLink} from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function normalizeText(value) {
    return (value || "").toString().toLowerCase();
}

function List({examples, examplesUrl, onClick}) {
    const [filter, setFilter] = useState('');
    const [ogVersion, setOgVersion] = useState('');

    // The version of the very library the examples import, it is baked into the lib on build.
    useEffect(() => {
        if (!examplesUrl) {
            return;
        }

        let cancelled = false;
        const libUrl = `${examplesUrl}/../external/og/lib/og.es.js`;

        import(/* webpackIgnore: true */ libUrl)
            .then((og) => {
                if (!cancelled) {
                    setOgVersion(og.version || '');
                }
            })
            .catch((error) => {
                console.error('Error reading the openglobus version:', error);
            });

        return () => {
            cancelled = true;
        };
    }, [examplesUrl]);

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
            {ogVersion ? (
                <div className="og-sandbox_version">openglobus v{ogVersion}</div>
            ) : null}
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
