#!/bin/bash

# install npm dependencies
npm install

# install cortex packages
cortex install

# start cortex server
cortex server

# start static and mock server
node tools/server.js

# open in browers
open ./html/index.html