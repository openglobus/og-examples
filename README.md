
## Localhost

Update submodule and build OpenGlobus library:
1) ```git submodule update --progress --init --recursive --force --remote```
2) ```cd ./external/og```
3) ```npm install```
4) ```npm run build``` or ```npm run build:og```

Optionally: Change in the `./build/config.json` url to `//localhost:8080/examples`

5) ```npm run serve```
6) ```npm run start```

## Examples metadata

`public/examples.json` supports manual catalog metadata for the examples list:

- `label`: visible example title
- `id`: example folder / route id
- `tags`: tag list used in card footer and search (shown as `#tag`)
- `image`: optional preview image URL for card header (hidden when empty)

SEO metadata is stored in each example HTML file:

- `<title>`
- `<meta name="description">`
- `<meta name="keywords">`

All metadata values are maintained manually per example.
