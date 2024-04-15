
## Run examples from openglobus.org

1) npm install
2) npm run start

## Run examples locally

1) Update openglobus submodule: git submodule update --progress --init --recursive --force --remote
2) cd ./external/og
3) npm install
4) npm run build
5) Change in the ./build/config.json url to //localhost:8080/examples
6) npm run serve
7) npm run start
