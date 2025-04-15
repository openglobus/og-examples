
## Localhost

Update submodule and build OpenGlobus library:
1) ```git submodule update --progress --init --recursive --force --remote```
2) ```cd ./external/og```
3) ```npm install```
4) ```npm run build``` or ```npm run build:og```

Optionally: Change in the `./build/config.json` url to `//localhost:8080/examples`

5) ```npm run serve```
6) ```npm run start```
